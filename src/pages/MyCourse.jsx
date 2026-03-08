import React, { useEffect, useState } from "react";
import config from "../services/config";
import { getMyCourses } from "../services/studentServices";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router";

export const MyCourse = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const token = localStorage.getItem('token')
            const result = await getMyCourses(token);

            if (result.status === "success") {
                setCourses(result.data);
            }
        } catch (error) {
            console.error("Error fetching courses", error);
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

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="fw-bold mb-4 text-center">
                    Registered <span style={{ color: '#6f42c1' }}>Courses</span>
                </h2>

                <style>
                    {`
            .registered-card {
                border: none;
                border-radius: 15px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                overflow: hidden;
                background-color: #fff;
            }
            .registered-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 10px 25px rgba(111, 66, 193, 0.15) !important;
            }
            .btn-purple {
                background-color: #6f42c1;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                transition: 0.3s;
                color: white;
            }
            .btn-purple:hover {
                background-color: #5a32a3;
                color: white;
                box-shadow: 0 4px 12px rgba(111, 66, 193, 0.3);
            }
        `}
                </style>

                <div className="row g-4">
                    {courses.map(c => (
                        <div className="col-12 col-md-6 col-lg-4" key={c.course_id}>
                            <div className="card h-100 shadow-sm registered-card">
                                {/* Purple Top Accent Bar matching Admin Header */}
                                <div style={{ height: '6px', backgroundColor: '#6f42c1' }}></div>

                                <div className="card-body p-4 d-flex flex-column">
                                    <h5 className="card-title fw-bold mb-2" style={{ color: '#333' }}>
                                        {c.course_name}
                                    </h5>

                                    <p className="card-text text-secondary small mb-3 flex-grow-1">
                                        {c.description}
                                    </p>

                                    <div className="mb-3 p-3 rounded-3 bg-light">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Fee Paid:</span>
                                            <span className="fw-bold" style={{ color: '#6f42c1' }}>Rs. {c.fees}</span>
                                        </div>
                                        <hr className="my-2 opacity-10" />
                                        <div className="d-flex align-items-center mb-1 small text-muted">
                                            <i className="bi bi-calendar-event me-2"></i>
                                            <span>Starts: { formatDate(c.start_date)}</span>
                                        </div>
                                        <div className="d-flex align-items-center small text-muted">
                                            <i className="bi bi-calendar-check me-2"></i>
                                            <span>Ends: { formatDate(c.end_date)}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-purple w-100 py-2 mt-auto"
                                        onClick={() => navigate(`/student/course-videos/${c.course_id}`)}
                                    >
                                        <i className="bi bi-play-circle me-2"></i>
                                        Watch Videos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};
