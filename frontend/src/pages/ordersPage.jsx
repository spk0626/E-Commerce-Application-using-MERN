
import React, { useEffect } from "react";

import {  Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getOrderDetails} from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/loader";
import { useParams} from "react-router-dom";

const OrdersPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;


  
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
      dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2 style={{marginTop:"10px", color:"#8DB600"}}> Order: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup.Item variant="flush">
            <h2 style={{marginTop:"20px", color:"#386150"}}>Delivery Address</h2>
            <p style={{color:"#177245"}}>
              <strong>Name : </strong>
              {order.user.name}
            </p>
            <p style={{color:"#177245"}}>
              <strong>Email : </strong> 
              {order.user.email}
            </p>
            <p style={{color:"#177245"}}>
              <strong>Address :</strong>
              {order.deliveryAddress.address}&nbsp;
              {order.deliveryAddress.city}&nbsp;
              {order.deliveryAddress.postalCode}&nbsp;
            </p>
            {order.isDeliverd ? (
              <Message variant="success">Paid On {order.isDeliverd}</Message>
            ) : (
              <Message variant="primary">Not Deliverd</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 style={{marginTop:"20px", color:"#386150"}}>Payment Method</h2>
            <p style={{color:"#177245"}}>
              <strong>Method :</strong>
              <strong>{order.paymentMethod}</strong>
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid On {order.paidAt}</Message>
            ) : (
              <Message variant="primary">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2 style={{marginTop:"20px", color:"#386150"}}>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your Cart is Empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ${item.price} = ${item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card style={{marginTop:"20px"}}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 style={{color:"#9169c1"}}>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Delivery</Col>
                  <Col>${order.deliveryFee}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Message variant="success"> Order {order._id} is Successfull</Message>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrdersPage;
