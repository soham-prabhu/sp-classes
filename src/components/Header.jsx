import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Header ()
{

    const navigate = useNavigate();

    const token = localStorage.getItem( "token" );
    const role = localStorage.getItem( "role" );
    const email = localStorage.getItem( "email" );

    const logout = () =>
    {
        localStorage.clear();
        navigate( "/" );
    };
    const goToChangePass = () =>
    {
        navigate( "/change-password" );
    };


    return (
        <Navbar expand="lg" sticky="top" className="p-0 flex-column shadow-sm" style={{ backgroundColor: '#212529' }}>
    {/* 1. Purple Accent Top Bar - Matches Admin Layout */}
    <div style={{ height: '5px', width: '100%', backgroundColor: '#6f42c1' }}></div>

    <Container fluid className="py-2 px-lg-4">
        {/* 2. Branded Logo matching ADMIN PANEL style */}
        <Navbar.Brand 
            className="fw-bold text-white fs-4" 
            style={{ cursor: 'pointer', letterSpacing: '1px' }}
            onClick={() => navigate("/")}
        >
            SP-<span style={{ color: '#6f42c1' }}>CLASSES</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="basic-navbar-nav">
            {/* LEFT LINKS */}
            <Nav className="me-auto mt-2 mt-lg-0">
                <Nav.Link 
                    className="text-white-50 fw-medium px-3" 
                    onClick={() => navigate("/")}
                >
                    Home
                </Nav.Link>
                <Nav.Link 
                    className="text-white-50 fw-medium px-3" 
                    onClick={() => navigate("/about")}
                >
                    About
                </Nav.Link>

                {token && role === "Student" && (
                    <Nav.Link 
                        className="text-white-50 fw-medium px-3" 
                        onClick={() => navigate("/student/my-courses")}
                    >
                        My Courses
                    </Nav.Link>
                )}
            </Nav>

            {/* RIGHT SIDE - Matching Admin Profile Button */}
            <Nav className="mt-2 mt-lg-0">
                {!token ? (
                    <Nav.Link 
                        className="btn btn-sm px-4 fw-bold" 
                        onClick={() => navigate("/login")}
                        style={{
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '6px',
                            backgroundColor: 'transparent'
                        }}
                    >
                        LOGIN
                    </Nav.Link>
                ) : (
                    <NavDropdown 
                        title={
                            <span 
                                className="btn btn-sm px-4 fw-bold dropdown-toggle text-white" 
                                style={{ border: '1px solid white', borderRadius: '6px' }}
                            >
                                {email || "Student"}
                            </span>
                        } 
                        id="basic-nav-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item onClick={goToChangePass} className="py-2">
                            Change Password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout} className="py-2 text-danger fw-bold">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Nav>
        </Navbar.Collapse>
    </Container>

    {/* Custom CSS for Hover Effects */}
    <style>
        {`
            .nav-link:hover {
                color: white !important;
                transition: 0.3s;
            }
            .dropdown-toggle::after {
                display: none !important; /* Removes the default arrow to match your image */
            }
            .dropdown-menu {
                border-radius: 10px;
                border: none;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                margin-top: 10px;
            }
        `}
    </style>
</Navbar>
    );
}
