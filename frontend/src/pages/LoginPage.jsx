import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/shared/formContainer";
import {useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
    
    const location = useLocation();
    const navigate = useNavigate(); 
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(login(email, password));
  };

  return (
    <>
      <FormContainer>
        <h1 style={{color:"#386150", marginTop:"20px"}}>SIGN IN</h1> 
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {/* {Loader} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label style={{ color: "#32CD32", marginTop: "20px" }}>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ maxWidth: "400px" }}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label style={{ color: "#32CD32", marginTop: "20px" }}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ maxWidth: "400px" }}
                    ></Form.Control>
                </Form.Group>
                  <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
                      SIGN IN
          </Button>
        </Form>
        <Row style={{marginTop:"20px"}}>
          <Col style={{color:"#228C22"}}>
            New Customer? 
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} style={{color:"#0077B6", marginLeft:"20px"}}>
             Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginPage;
