import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllActiveCourses } from '../services/userServices';
import { deleteCourse } from '../services/courseServices';
import { toast } from 'react-toastify';
import Header from '../Components/Header';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminView = location.pathname.startsWith('/admin');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const result = await getAllActiveCourses();
    if (result.status === 'success') {
      setCourses(result.data);
    } else {
      toast.error("Failed to load courses");
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const result = await deleteCourse(id);
      if (result.status === 'success') {
        toast.success("Course deleted successfully");
        loadCourses();
      } else {
        toast.error(result.message || "Delete failed");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>

      {!isAdminView && <Header />}

      <div className={`container ${isAdminView ? 'py-2' : 'py-5'}`}>

        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h2 className="fw-bold text-dark m-0">
              {isAdminView ? "Manage Courses" : "Available Courses"}
            </h2>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            {/* CSS for the Purple Focus Glow */}
            <style>
              {`
      .search-input:focus {
        border-color: #6f42c1 !important;
        box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25) !important;
      }
    `}
            </style>

            <div className="input-group shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <input
                type="text"
                className="form-control border-1 search-input"
                style={{
                  borderRight: 'none',
                  paddingLeft: '15px'
                }}
                placeholder="Search by course name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn text-white fw-bold px-4"
                type="button"
                style={{
                  backgroundColor: '#6f42c1',
                  borderColor: '#6f42c1',
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a32a3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6f42c1'}
              >
                <span className="me-2"></span> Search
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div className="col-12 col-md-6 col-lg-4" key={course.course_id}>
                <div className="card h-100 shadow-sm border-0">

                  <div style={{ height: '5px', backgroundColor: '#6f42c1', borderRadius: '5px 5px 0 0' }}></div>

                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-dark mb-2">{course.course_name}</h5>
                    <p className="card-text text-secondary small flex-grow-1">
                      {course.description?.length > 100
                        ? course.description.substring(0, 100) + "..."
                        : course.description}
                    </p>

                    <div className="my-3 p-2 bg-light rounded">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Price:</span>
                        <span className="fw-bold text-dark">₹{course.fees}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted small">Starts:</span>
                        <span className="text-dark small">{formatDate(course.start_date)}</span>
                      </div>
                    </div>

                    {isAdminView && userRole === 'Admin' ? (
                      <div className="d-flex gap-3">
                        <button
                          className="btn flex-grow-1 fw-bold"
                          style={{
                            border: '2px solid #6f42c1',
                            color: '#6f42c1',
                            backgroundColor: 'transparent',
                            borderRadius: '8px'
                          }}
                          onClick={() => navigate(`/admin/course/update/${course.course_id}`, { state: { course } })}
                        >
                          Edit Course
                        </button>
                        <button
                          className="btn flex-grow-1 fw-bold"
                          style={{
                            border: '2px solid #6f42c1',
                            color: '#6f42c1',
                            backgroundColor: 'transparent',
                            borderRadius: '8px'
                          }}
                          onClick={() => onDelete(course.course_id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn text-white w-100 fw-bold"
                        style={{ backgroundColor: '#6f42c1' }}
                        onClick={() => navigate(`/course/${course.course_id}`)}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">No courses found matching your search.</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;