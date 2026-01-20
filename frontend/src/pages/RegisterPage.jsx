import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/shared/formContainer";
import {useLocation, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    
    const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email,  password));
    }
    };
    
    return (
        <>
          <FormContainer>
              <h1 style={{color:"#386150", marginTop:"20px", marginLeft:"100px"}}>Register</h1>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              {message && <Message variant="danger">{message}</Message>}
              <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                      <Form.Label style={{color: "#32CD32", marginTop:"20px"}}>Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="enter your name"
                          value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ maxWidth: "400px" }}
                      ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                      <Form.Label style={{color: "#32CD32", marginTop:"20px"}}>Email Address</Form.Label>
                      <Form.Control
                          type="email"
                          placeholder="enter email"
                          value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ maxWidth: "400px" }}
                      ></Form.Control>
                  </Form.Group>
                  {/* <Form.Group controlId="phoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                          type="tel"
                          placeholder="enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                      ></Form.Control>
                  </Form.Group> */}
                  <Form.Group controlId="password">
                      <Form.Label style={{color: "#32CD32", marginTop:"20px"}}>Password</Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="enter password"
                          value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ maxWidth: "400px" }}
                      ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                      <Form.Label style={{color: "#32CD32", marginTop:"20px"}}>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ maxWidth: "400px" }}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" style={{marginTop:"30px", marginLeft:"140px"}}>
                        SIGN UP
                    </Button>
                </Form>
                <Row>
                    <Col style={{marginTop:"20px", color:"#228C22", marginLeft:"0px"}}>
                        Have an account!
                        <Link to={redirect ? `login?redirect=${redirect}` : "/login"} style={{marginLeft:"10px"}}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    );
};

export default RegisterPage;
