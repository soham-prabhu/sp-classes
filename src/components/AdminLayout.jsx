import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AdminLayout() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role !== 'Admin') {
            navigate('/login');
        }
    }, [role, navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Top Navbar: Dark with Purple Accent Top Bar */}
            <div style={{ height: '5px', backgroundColor: '#6f42c1' }}></div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/admin" style={{ letterSpacing: '1px' }}>
                        ADMIN<span style={{ color: '#6f42c1' }}>PANEL</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="topNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><Link className="nav-link" to="/admin">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle btn btn-sm px-3 shadow-none"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    style={{
                                        color: 'white',
                                        border: '1px solid white',
                                        backgroundColor: 'transparent'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    Profile
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                                    <li><button className="dropdown-item text-danger fw-bold" onClick={logout}>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Secondary Navbar: Sub-navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm mb-5">
                <div className="container">
                    <div className="navbar-nav align-items-center">
                        <span className="nav-link fw-bold border-end pe-3 me-2" style={{ cursor: 'default', color: '#6f42c1' }}>
                            Dashboard
                        </span>

                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold" href="#" data-bs-toggle="dropdown">Courses</a>
                            <ul className="dropdown-menu shadow border-0">
                                <li><Link className="dropdown-item" to="/admin/courses">All Courses</Link></li>
                                <li><Link className="dropdown-item" to="/admin/add-course">Add Course</Link></li>
                            </ul>
                        </div>

                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold" href="#" data-bs-toggle="dropdown">Videos</a>
                            <ul className="dropdown-menu shadow border-0">
                                <li><Link className="dropdown-item" to="/admin/videos">All Videos</Link></li>
                                <li><Link className="dropdown-item" to="/admin/add-video">Add Video</Link></li>
                            </ul>
                        </div>

                        <Link className="nav-link fw-semibold" to="/admin/students">Students</Link>
                    </div>
                </div>
            </nav>

            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;