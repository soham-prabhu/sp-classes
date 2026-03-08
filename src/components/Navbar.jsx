import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation();
   if (location.pathname.startsWith('/admin')) {
        return null; 
    }

    return (
       <nav className="navbar navbar-expand-lg navbar-dark shadow-sm p-0 flex-column" style={{ backgroundColor: '#212529' }}>
    {/* 1. Purple Accent Top Bar (Matches image_90698a.png) */}
    <div style={{ height: '5px', width: '100%', backgroundColor: '#6f42c1' }}></div>

    <div className="container py-2">
        {/* 2. Branded Logo with Purple "PANEL/LEARNING" */}
        <Link className="navbar-brand fw-bold fs-4" to="/" style={{ letterSpacing: '1px' }}>
            <span className="text-white">E-</span><span style={{ color: '#6f42c1' }}>LEARNING</span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white-50 px-3" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white-50 px-3" to="/about">About</Link>
                </li>
            </ul>

            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    {/* 3. White Outlined Button Style (Matches "Profile" button in image_90698a.png) */}
                    <Link 
                        className="btn btn-sm px-4 fw-bold" 
                        to="/login"
                        style={{
                            color: 'white',
                            backgroundColor: 'transparent',
                            borderRadius: '6px',
                            border: '1px solid white',
                            transition: '0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        LOGIN
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
    )
}

export default Navbar