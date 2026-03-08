import React, { useEffect, useState } from 'react'
import { getAllCourses, deleteCourse } from '../services/courseServices.js'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function AllCourses() {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        const result = await getAllCourses()
        if (result.status === 'success') {
            setCourses(result.data)
        } else {
            toast.error("Failed to load courses")
        }
    }

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


    return (
        <div className="container py-4">
            <h2 className="text-center my-4 fw-bold" style={{ color: '#333' }}>
                All <span style={{ color: '#6f42c1' }}>Courses</span>
            </h2>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle mb-0">
                    {/* Header with Purple Background */}
                    <thead>
                        <tr>
                            {/* We apply the style to the <th> to ensure it covers the whole header area */}
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>ID</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Course Name</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Description</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Fees</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Start Date</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>End Date</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Expire Days</th>
                            <th className="py-3 border-0 text-center text-white" style={{ backgroundColor: '#6f42c1' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.course_id}>
                                <td className="fw-bold">{course.course_id}</td>
                                <td>{course.course_name}</td>
                                <td className="text-muted small">{course.description}</td>
                                <td className="fw-semibold">₹{course.fees}</td>
                                <td>{formatDate(course.start_date)}</td>
                                <td>{formatDate(course.end_date)}</td>
                                <td>{course.video_expire_days}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        {/* Edit Icon - Purple Theme */}
                                        <button
                                            className="btn btn-sm"
                                            style={{ color: '#6f42c1', border: '1px solid #6f42c1' }}
                                            onClick={() => navigate(`/admin/course/update/${course.course_id}`, { state: { course } })}
                                        >
                                            ✎
                                        </button>

                                        {/* Delete Icon - Changed to Purple Theme as requested */}
                                        <button
                                            className="btn btn-sm"
                                            style={{ color: '#6f42c1', border: '1px solid #6f42c1' }}
                                            onClick={() => onDelete(course.course_id)}
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllCourses