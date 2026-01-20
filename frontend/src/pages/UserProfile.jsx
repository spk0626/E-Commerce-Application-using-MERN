import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderAction";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const [message] = useState("");
    
    //const location = useLocation();
    const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault(); 
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h1 style={{marginTop:"20px", color:"#386150"}}>Update Information</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          {message && <Message variant="danger">{message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Name"
                value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{maxWidth:"300px"}}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{maxWidth:"300px"}}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              style={{maxWidth:"300px"}}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              style={{maxWidth:"300px"}}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" varient="primary" style={{marginTop:"20px", marginLeft:"100px"}}>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={7} style={{marginLeft:"100px", marginTop:"40px"}}>
          <h1 style={{color:"#9169c1", marginLeft:"0px"}}>My Orders</h1>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm" style={{marginTop:"50px"}}>
              <thead>
                <tr>
                  <td style={{color: "#51087E"}}>ID</td>
                  <td style={{color: "#51087E"}}>DATE</td>
                  <td style={{color: "#51087E"}}>TOTAL</td>
                  <td style={{color: "#51087E"}}>PAID</td>
                  <td style={{color: "#51087E"}}>DELIVERD</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDeleverd ? (
                        order.deleverdAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="info">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;