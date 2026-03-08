import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import config from "../services/config";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${config.BASE_URL}/course/all-active-courses`
        );
        const result = await response.json();

        if (result.status === "success") {
          setCourses(result.data);
        }
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, [navigate]);

  // No courses found
  if (!courses || courses.length === 0) {
    return (
      <>
        <Header />
        <div className="container mt-5">No active courses available</div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h3 className="mb-4 fw-bold text-center">
          Available <span style={{ color: '#6f42c1' }}>Courses</span>
        </h3>

        <style>
          {`
      .course-card {
        border: none;
        border-radius: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        overflow: hidden;
      }
      .course-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 30px rgba(111, 66, 193, 0.15) !important;
      }
      .btn-view {
        background-color: #6f42c1;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        transition: 0.3s;
      }
      .btn-view:hover {
        background-color: #5a32a3;
        color: white;
      }
    `}
        </style>

        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-4" key={course.course_id}>
              <div className="card h-100 shadow-sm course-card">
                {/* Top Decorative Purple Bar */}
                <div style={{ height: '6px', backgroundColor: '#6f42c1' }}></div>

                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold mb-3" style={{ color: '#333' }}>
                    {course.course_name}
                  </h5>

                  <p className="card-text text-secondary small flex-grow-1">
                    {course.description}
                  </p>

                  <div className="mt-3 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small d-block">Course Fees</span>
                      <h5 className="fw-bold mb-0" style={{ color: '#6f42c1' }}>
                        ₹ {course.fees}
                      </h5>
                    </div>

                    <button
                      className="btn btn-view text-white px-3 py-2"
                      onClick={() => navigate(`/course/${course.course_id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
