import React, { useEffect, useState } from 'react'
import { getAllVideos, deleteVideo } from '../services/videoServices'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function AllVideos() {
    const [videos, setVideos] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("All")
    const navigate = useNavigate()

    useEffect(() => {
        loadVideos()
    }, [])

    const loadVideos = async () => {
        const result = await getAllVideos()
        if (result.status === 'success') {
            setVideos(result.data)
        } else {
            toast.error("Failed to load Videos")
        }
    }

    const uniqueCourses = ["All", ...new Set(videos.map(v => v.course_name).filter(Boolean))];
    const filteredVideos = selectedCourse === "All" ? videos : videos.filter(video => video.course_name === selectedCourse);

    const onDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            const result = await deleteVideo(id);
            if (result.status === 'success') {
                toast.success("Video deleted successfully");
                loadVideos();
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
                All <span style={{ color: '#6f42c1' }}>Videos</span>
            </h2>

            <div className="mb-4 row">
                <div className="col-md-4">
                    <label className="form-label fw-bold" style={{ color: '#6f42c1' }}>Filter by Course</label>
                    <select
                        className="form-select border-2"
                        style={{ borderColor: '#6f42c1', borderRadius: '8px' }}
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {uniqueCourses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="py-3 border-0 ps-3 text-white" style={{ backgroundColor: '#6f42c1' }}>ID</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Course</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Title</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Description</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>YouTube URL</th>
                            <th className="py-3 border-0 text-white" style={{ backgroundColor: '#6f42c1' }}>Added At</th>
                            <th className="py-3 border-0 text-center pe-3 text-white" style={{ backgroundColor: '#6f42c1' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredVideos.map(video => (
                            <tr key={video.video_id}>
                                <td className="fw-bold ps-3">{video.video_id}</td>
                                <td><span className="badge" style={{ backgroundColor: '#f3eaff', color: '#6f42c1' }}>{video.course_id}</span></td>
                                <td className="fw-semibold">{video.title}</td>
                                <td className="text-muted small">
                                    <div className="text-truncate" style={{ maxWidth: '150px' }}>{video.description}</div>
                                </td>
                                <td>
                                    <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none small" style={{ color: '#6f42c1' }}>
                                        View Video ↗
                                    </a>
                                </td>
                                <td>{formatDate(video.added_at)}</td>
                                <td className="pe-3">
                                    <div className="d-flex justify-content-center gap-2">
                                        
                                        <button
                                            className="btn btn-sm"
                                            style={{ color: '#6f42c1', border: '2px solid #6f42c1', fontWeight: 'bold' }}
                                            onClick={() => navigate(`/admin/video/update/${video.video_id}`, { state: { video } })}
                                        >
                                            ✎
                                        </button>

                                        <button
                                            className="btn btn-sm"
                                            style={{ color: '#6f42c1', border: '2px solid #6f42c1', fontWeight: '900' }}
                                            onClick={() => onDelete(video.video_id)}
                                        >
                                            <span style={{ fontSize: '1.1rem' }}>🗑</span>
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

export default AllVideos