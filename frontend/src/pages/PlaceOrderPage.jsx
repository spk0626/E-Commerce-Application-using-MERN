import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { clearCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import CheckOutStep from "../components/shared/CheckoutStep";
import {useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  //fun for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };    
  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.deliveryFee = addDecimal(cart.cartItems > 500 ? 0 : 50);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.deliveryFee)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        deliveryFee: cart.deliveryFee,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [navigate, success, dispatch]);
    
    
  return (
    <> 
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 style={{marginTop:"0px", color:"#386150"}}>Delivery</h2>
              <p style={{marginTop:"0px", color:"#9169c1"}}>
                <strong>Address :</strong>
                {cart.deliveryAddress.address}&nbsp;
                {cart.deliveryAddress.city}&nbsp;
                {cart.deliveryAddress.postalCode}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 style={{marginTop:"0px",color:"#386150"}}>Payment Method</h2>
              <p style={{color:"#9169c1"}}>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 style={{marginTop:"0px", color:"#386150"}}>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X Rs.{item.price} = Rs.{item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{marginTop:"20px"}}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 style={{marginTop:"0px", color:"#386150"}}>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{cart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Delivery Fee</Col>
                  <Col>Rs.{cart.deliveryFee}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
          
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
