import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseVideos } from "../services/studentServices";
import Header from "../Components/Header";

function CourseVideos() {
    const { id } = useParams()
    const [videos, setVideos] = useState([]);
    const [course_id, setCourse_id] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setCourse_id(id)
        if (id)
            loadVideos()
    }, [id]);

    const loadVideos = async () => {
        console.log({ id });


        const token = localStorage.getItem("token");
        const res = await getCourseVideos(id, token);

        console.log("FULL RESPONSE:", res);
        console.log("VIDEOS ARRAY:", res.data);

        setVideos(res.data);
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
                {/* Page Header matching the Admin Panel style */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">
                        Course <span style={{ color: '#6f42c1' }}>Videos</span>
                    </h2>
                    <span className="badge p-2 shadow-sm" style={{ backgroundColor: '#6f42c1' }}>
                        Total Videos: {videos.length}
                    </span>
                </div>

                {/* Table Container Card */}
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    {/* Purple Accent Bar */}
                    <div style={{ height: '6px', backgroundColor: '#6f42c1' }}></div>

                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead style={{ backgroundColor: '#f8f9fa' }}>
                                <tr>
                                    <th className="py-3 px-4 border-0" style={{ color: '#6f42c1', fontWeight: '700' }}>ID</th>
                                    <th className="py-3 border-0 text-secondary">Course</th>
                                    <th className="py-3 border-0 text-secondary">Title</th>
                                    <th className="py-3 border-0 text-secondary">Description</th>
                                    <th className="py-3 border-0 text-secondary">YouTube</th>
                                    <th className="py-3 border-0 text-secondary">Added At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {videos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted">
                                            <i className="bi bi-camera-video-off fs-1 d-block mb-2"></i>
                                            No videos found in the database.
                                        </td>
                                    </tr>
                                ) : (
                                    videos.map((v) => (
                                        <tr key={v.video_id} style={{ transition: '0.3s' }}>
                                            <td className="px-4 fw-bold" style={{ color: '#6f42c1' }}>{v.video_id}</td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    ID: {v.course_id}
                                                </span>
                                            </td>
                                            <td className="fw-semibold">{v.title}</td>
                                            <td>
                                                <div className="text-truncate" style={{ maxWidth: '200px' }} title={v.description}>
                                                    {v.description}
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    href={v.youtube_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-sm text-white px-3"
                                                    style={{ backgroundColor: '#6f42c1', borderRadius: '6px' }}
                                                >
                                                    <i className="bi bi-play-fill me-1"></i> Watch
                                                </a>
                                            </td>
                                            <td className="text-muted small">
                                                {formatDate(v.added_at)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Custom Hover Styling */}
                <style>
                    {`
            .table-hover tbody tr:hover {
                background-color: rgba(111, 66, 193, 0.03) !important;
            }
        `}
                </style>
            </div>
        </>
    );
}

export default CourseVideos;