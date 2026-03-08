import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { registerCourse } from '../services/studentServices'
import { toast } from 'react-toastify'

export const CourseRegistration = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState('')
const storedEmail = localStorage.getItem('email')
const [email, setEmail] = useState(storedEmail || '')
  const [mobile_no, setMobile_no] = useState('')

  const course = state?.course

 const register = async () => {

  if (name === '') {
    toast.warn('Name must be entered')
    return
  }

  if (!email) {
    toast.warn('Email must be entered')
    return
  }

  if (mobile_no === '') {
    toast.warn('Mobile number must be entered')
    return
  }

  const result = await registerCourse(name, email, mobile_no, id)

  console.log(result)

  if (result.status === 'success') {
    toast.success('Registration Successful')

    const token = localStorage.getItem('token')

    if (token)
      navigate('/student/my-courses')
    else
      navigate('/login')

  } else {
    toast.error(result.error || "Registration Failed")
  }
}

  return (
    <div className="container my-5">
      {/* Custom Styles for Focus and Table */}
      <style>
        {`
          .form-control:focus {
            border-color: #6f42c1 !important;
            box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25) !important;
          }
          .registration-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
          }
          .info-table th {
            background-color: #f8f9fa !important;
            color: #6f42c1 !important;
            font-weight: 700;
          }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Header & Back Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Course <span style={{ color: '#6f42c1' }}>Registration</span></h2>
            <button className="btn btn-link text-decoration-none text-muted p-0" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left me-1"></i> Cancel
            </button>
          </div>

          {/* 1. Course Information Table */}
          <div className="card shadow-sm border-0 mb-5" style={{ borderRadius: '15px' }}>
            <div className="table-responsive">
              <table className="table mb-0 info-table">
                <tbody>
                  <tr className="border-bottom">
                    <th scope="row" className="p-3" style={{ width: '30%' }}>Selected Course</th>
                    <td className="p-3 fw-bold text-dark fs-5">{course?.course_name || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="p-3">Course Fees</th>
                    <td className="p-3 fw-bold fs-5 text-dark">₹ {course?.fees}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Registration Form Card */}
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card shadow-lg registration-card">
                {/* Purple Top Accent Bar - Matching Admin Layout */}
                <div style={{ height: '6px', backgroundColor: '#6f42c1' }}></div>

                <div className="card-header bg-white border-0 py-3 text-center">
                  <h4 className="fw-bold text-dark mb-0">Enter Your Details</h4>
                  <small className="text-muted">Create your account to access course content</small>
                </div>

                <div className="card-body p-4 pt-2">
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary small">Full Name</label>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="e.g. John Doe"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                       {!storedEmail && (
    <div className="mb-3">
      <label className="form-label fw-semibold text-secondary small">
        Email
      </label>
      <input
        type="email"
        className="form-control py-2"
        placeholder="e.g. abc@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  )}

                 

                  <div className="mb-4">
                    <label className="form-label fw-semibold text-secondary small">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control py-2"
                      placeholder="e.g. +91 98765 43210"
                      onChange={(e) => setMobile_no(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-lg w-100 fw-bold text-white shadow-sm"
                    style={{ backgroundColor: '#6f42c1', borderRadius: '10px', transition: '0.3s' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5a32a3'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6f42c1'}
                    onClick={register}
                    type="button"
                  >
                    Confirm Registration
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}