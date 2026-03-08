import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Card, Form, Button } from "react-bootstrap"; // Removed Spinner import
import { toast } from "react-toastify";
import { updateNewPass } from "../services/studentServices";

export default function ChangePassword() {
    const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            const response = await updateNewPass(passwords, token);
            
            if (response.status == "success" ) {
                toast.success("Password updated!");
                navigate("/student/dashboard");
            } else {
                toast.error(response.error || "Failed to update password");
            }
        } catch (err) {
            const errorMsg =  "Something went wrong";
            toast.error(errorMsg);
        } 
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            {/* Custom Focus and Card Styles */}
            <style>
                {`
                    .form-control:focus {
                        border-color: #6f42c1 !important;
                        box-shadow: 0 0 0 0.25rem rgba(111, 66, 193, 0.25) !important;
                    }
                    .change-pass-card {
                        border: none;
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
                    }
                `}
            </style>

            <Card style={{ width: '400px' }} className="change-pass-card">
                {/* Purple Top Accent Bar - Matching Admin Layout */}
                <div style={{ height: '6px', backgroundColor: '#6f42c1' }}></div>
                
                <Card.Body className="p-4">
                    <Card.Title className="text-center mb-4 fw-bold">
                        Change <span style={{ color: '#6f42c1' }}>Password</span>
                    </Card.Title>
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="newPassword" 
                                placeholder="Enter new password"
                                onChange={handleChange} 
                                required 
                                className="py-2"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold text-secondary">Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Repeat new password"
                                onChange={handleChange} 
                                required 
                                className="py-2"
                            />
                        </Form.Group>

                        <Button 
                            type="submit" 
                            className="w-100 fw-bold border-0 py-2 shadow-sm"
                            style={{ 
                                backgroundColor: '#6f42c1', 
                                borderRadius: '10px',
                                transition: '0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a32a3'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#6f42c1'}
                        >
                            Update Password
                        </Button>
                        
                        <div className="text-center mt-3">
                           <small className="text-muted" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                               Cancel and Go Back
                           </small>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}