import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Header from '../Components/Header';

const About = () => {
  const location = useLocation();
  const isAdminView = location.pathname.startsWith('/admin');

  const purpleTheme = {
    color: '#6f42c1',
  };

  const purpleBg = {
    backgroundColor: '#6f42c1',
    borderColor: '#6f42c1',
  };

  return (
    <>
      {!isAdminView && <Header />}

      <div className={`container ${isAdminView ? 'py-3' : 'py-5'}`}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* Hero Section */}
            <div className="text-center mb-5">
              <h1 className="fw-bold text-dark display-4">
                About Our <span style={purpleTheme}>Platform</span>
              </h1>
              <p className="lead text-secondary">
                Empowering learners worldwide with high-quality, accessible education.
              </p>
              <div className="mx-auto" style={{ height: '4px', width: '60px', backgroundColor: '#6f42c1', borderRadius: '2px' }}></div>
            </div>

            {/* Mission & Vision Section */}
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                  <h3 className="fw-bold mb-3" style={purpleTheme}>Our Mission</h3>
                  <p className="text-secondary">
                    Our mission is to bridge the gap between industry requirements and academic learning.
                    We provide expert-led courses in cutting-edge technologies like React Native,
                    Data Science, and AI to help students build successful careers.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                  <h3 className="fw-bold mb-3" style={purpleTheme}>Our Vision</h3>
                  <p className="text-secondary">
                    We envision a world where every individual has the opportunity to learn
                    and master the skills they need to thrive in the digital age, regardless of
                    their geographical or financial constraints.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded shadow-sm p-5 mb-5" style={{ borderRadius: '15px' }}>
              <h2 className="text-center fw-bold mb-5">Why Choose Us?</h2>
              <div className="row g-4 text-center">
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="mb-3" style={purpleTheme}><i className="bi bi-laptop fs-1"></i></div>
                    <h5 className="fw-bold">Expert Instructors</h5>
                    <p className="small text-muted">Learn from professionals with years of industry experience.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="mb-3" style={purpleTheme}><i className="bi bi-clock-history fs-1"></i></div>
                    <h5 className="fw-bold">Lifetime Access</h5>
                    <p className="small text-muted">Enroll once and access course videos anytime, anywhere.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="mb-3" style={purpleTheme}><i className="bi bi-patch-check fs-1"></i></div>
                    <h5 className="fw-bold">Certified Learning</h5>
                    <p className="small text-muted">Gain recognized certificates to showcase your skills.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center py-5 rounded shadow-sm border-top border-4" style={{ borderColor: '#6f42c1 !important', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
              <h4 className="fw-bold">Have Questions?</h4>
              <p className="text-muted mb-4">Our support team is here to help you 24/7.</p>
              <button 
                className="btn btn-lg text-white px-5 fw-bold" 
                style={{ ...purpleBg, borderRadius: '10px', transition: '0.3s' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Contact Support
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default About;