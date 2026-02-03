import React from "react";
import { Navbar, Nav, Container, NavDropdown  } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            <Navbar style={{
                background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.2)'
            }} expand="lg" variant="dark" collapseOnSelect sticky="top">
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <i className="fa-solid fa-leaf" style={{fontSize: '28px'}}></i>
                            Your Garden
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart" style={{ marginRight:"20px" }}>
                                <Nav.Link style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }} className="nav-link-hover">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    CART
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="user-dropdown" style={{fontWeight: '500'}}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <i className="fa-solid fa-user"  style={{marginRight:"10px"}}></i>
                                            PROFILE
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fa-solid fa-right-from-bracket" style={{marginRight:"10px"}}></i>
                                        LOGOUT
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}>
                                        <i className="fas fa-user"></i>
                                        SIGN-IN
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <style>{`
                .nav-link-hover:hover {
                    opacity: 0.9;
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
};

export default Header;