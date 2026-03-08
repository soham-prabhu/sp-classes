import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addCourse, updateCourse } from '../services/courseServices';
import { toast } from 'react-toastify';

function CourseForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const editData = location.state?.course;

    const [course, setCourse] = useState({
        course_name: '',
        description: '',
        fees: '',
        start_date: '',
        end_date: '',
        video_expire_days: ''
    });
    useEffect(() => {
        if (editData) {
            setCourse({
                course_name: editData.course_name || '',
                description: editData.description || '',
                fees: editData.fees || '',
                start_date: formatDate(editData.start_date),
                end_date: formatDate(editData.end_date),
                video_expire_days: editData.video_expire_days || ''
            });
        }
    }, [editData]);

    const handleSubmit = async () => {
        if (!course.course_name || !course.fees) {
            toast.error("Course name and fees are required");
            return;
        }
        let result;
        if (editData) {
            result = await updateCourse(editData.course_id, course);
        } else {
            result = await addCourse(course);
        }

        if (result.status === 'success') {
            console.log(editData)
            toast.success(editData ? "Course Updated!" : "Course Added!");
            navigate('/admin/courses');
        } else {
            toast.error("Operation failed");
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
        
        <div className="container py-5">
            
            <div className="card custom-card mx-auto overflow-hidden" style={{ maxWidth: '600px' }}>
                {/* Top Accent Bar */}
                <div style={{ height: '8px', backgroundColor: '#6f42c1' }}></div>

                <div className="card-body p-4">
                    <h2 className="text-center fw-bold mb-4" style={{ color: '#333' }}>
                        {editData ? "Update" : "Add New"} <span style={{ color: '#6f42c1' }}>Course</span>
                    </h2>

                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary">Course Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg fs-6"
                            placeholder="e.g. Full Stack Development"
                            value={course.course_name}
                            onChange={(e) => setCourse({ ...course, course_name: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary">Description</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Briefly describe the course..."
                            value={course.description}
                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary">Fees (₹)</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter amount"
                            value={course.fees}
                            onChange={(e) => setCourse({ ...course, fees: e.target.value })}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold text-secondary">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={course.start_date}
                                onChange={(e) => setCourse({ ...course, start_date: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold text-secondary">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={course.end_date}
                                onChange={(e) => setCourse({ ...course, end_date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary">Video Expire Days</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="e.g. 365"
                            value={course.video_expire_days}
                            onChange={(e) => setCourse({ ...course, video_expire_days: e.target.value })}
                        />
                    </div>

                    <button
                        className="btn btn-lg text-white w-100 shadow-sm"
                        style={{ backgroundColor: '#6f42c1', borderRadius: '10px', fontWeight: 'bold' }}
                        onClick={handleSubmit}
                    >
                        {editData ? "Update Course" : "Add Course"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseForm;