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
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <i className="fa-solid fa-house" style={{marginRight: '10px' }}></i>
                            HOME
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart" style={{ marginLeft: '1000px', marginRight:"10px" }}>
                                <Nav.Link >
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    &nbsp; CART
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name}>
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
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>
                                        &nbsp; SIGN-IN
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;