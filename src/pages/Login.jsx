import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser } from '../services/userServices'
import { LoginContext } from '../context/LoginContext'

function Login() {

    const { loginStatus, setLoginStatus } = useContext(LoginContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()

  const login = async () => {

    if (email === '')
      toast.warn('email must be entered')
    else if (password === '')
      toast.warn('password must be entered')
    else if (role === '')
      toast.warn('role must be entered')
    else {

      const result = await loginUser(email, password, role)

      if (result.status === 'success') {
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('role', role)
        localStorage.setItem('email', email)

        toast.success('Login Successful')
        if (role === 'Admin') {
          navigate('/admin')
        } else if (role === 'Student') {
          navigate('/student/dashboard')
        }

      } else {
        toast.error(result.error)
      }
    }
  }

  return (
    <div
  className="container d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
>
  <style>
    {`
      .form-control:focus, .form-select:focus {
        border-color: #6f42c1 !important;
        box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25) !important;
      }
      .login-card {
        border: none;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
      }
    `}
  </style>

  <div className="card login-card" style={{ width: '26rem' }}>
    <div style={{ height: '8px', backgroundColor: '#6f42c1' }}></div>
    
    <div className="card-body p-4">
      <h3 className="card-title text-center mb-4 fw-bold" style={{ color: '#333' }}>
        Welcome <span style={{ color: '#6f42c1' }}>Back</span>
      </h3>

      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label fw-semibold text-secondary">
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="name@example.com"
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label fw-semibold text-secondary">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          placeholder="Enter your password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold text-secondary">Role</label>
        <select
          className="form-select"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="">Select your role</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-lg text-white w-100 shadow-sm"
        style={{ 
          backgroundColor: '#6f42c1', 
          borderColor: '#6f42c1', 
          borderRadius: '10px',
          fontWeight: 'bold',
          transition: '0.3s'
        }}
        onClick={login}
        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        Login
      </button>

      <p className="text-center mt-3 small text-muted">
        Secure Access to Your Learning Portal
      </p>
    </div>
  </div>
</div>
  )
}

export default Login
