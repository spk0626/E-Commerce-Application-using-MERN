import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/shared/CheckoutStep";
import {useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
    const { deliveryAddress } = cart;
    
    const navigate = useNavigate(); 

  if (!deliveryAddress.address) {
    navigate("/delivery");
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  
    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
    };
    

  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <h1 style={{marginTop:"20px",color:"#386150"}}>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend" style={{marginTop:"30px", color: "#32CD32"}}>Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Cash-on-Delivery"
              id="cash"
              name="paymentMethod"
                          value="cash"
                          checked
                          style={{marginTop:"20px", color:"#1560BD"}}
              onChange={(e) => setPaymentMethod(e.target.value)}
                      ></Form.Check>

          </Col>
        </Form.Group>
        <Button type="Submit" variant="primary" style={{marginTop:"20px"}}>
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentPage;
