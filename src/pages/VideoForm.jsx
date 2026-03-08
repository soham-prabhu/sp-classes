import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addVideo, updateVideo } from '../services/videoServices';
import { toast } from 'react-toastify';
import { getAllCourses } from '../services/courseServices.js';

function VideoForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.video;

    
    const [video, setVideo] = useState({
        course_id: '',
        title: '',
        youtube_url: '',
        description: ''
    });
const [courses, setCourses] = useState([]);
const loadCourses = async () => {
    const result = await getAllCourses();
    if (result.status === 'success') {
        setCourses(result.data);
    } else {
        toast.error("Could not load courses for the dropdown");
    }
};

useEffect(() => {
    loadCourses();
    if (editData) {
        setVideo({
            course_id: editData.course_id || '',
            title: editData.title || '',
            youtube_url: editData.youtube_url || '',
            description: editData.description || ''
        });
    }
}, [editData]);

    const handleSubmit = async () => {
        console.log(video);
        
        const result = editData? await updateVideo(editData.video_id, video): await addVideo(video);

        if (result.status === 'success') {
            toast.success(editData ? "Video Updated!" : "Video Added!");
            navigate('/admin/videos');
        }
    };

    return (
        <div className="container py-5">
    <div className="card custom-card mx-auto overflow-hidden" style={{ maxWidth: '600px' }}>
        {/* Top Accent Bar */}
        <div style={{ height: '8px', backgroundColor: '#6f42c1' }}></div>

        <div className="card-body p-4">
            <h2 className="text-center fw-bold mb-4" style={{ color: '#333' }}>
                {editData ? "Edit" : "Add New"} <span style={{ color: '#6f42c1' }}>Video</span>
            </h2>

            <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Course</label>
                <select 
                    className="form-select" 
                    value={video.course_id}
                    onChange={(e) => setVideo({ ...video, course_id: e.target.value })}
                >
                    <option value="">Select a course</option>
                    {courses.map(c => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">Video Title</label>
                <input 
                    className="form-control" 
                    placeholder="Enter title"
                    value={video.title}
                    onChange={(e) => setVideo({ ...video, title: e.target.value })} 
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold text-secondary">YouTube URL</label>
                <input 
                    className="form-control" 
                    placeholder="https://youtube.com/..."
                    value={video.youtube_url}
                    onChange={(e) => setVideo({ ...video, youtube_url: e.target.value })} 
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-semibold text-secondary">Description</label>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="What is this video about?"
                    value={video.description}
                    onChange={(e) => setVideo({ ...video, description: e.target.value })}
                />
            </div>

            <button 
                className="btn btn-lg text-white w-100 shadow-sm" 
                style={{ backgroundColor: '#6f42c1', borderRadius: '10px', fontWeight: 'bold' }}
                onClick={handleSubmit}
            >
                {editData ? "Update Video" : "Add Video"}
            </button>
        </div>
    </div>
</div>
    );
}

export default VideoForm