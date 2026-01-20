import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/formContainer";
import { saveDeliveryAddress } from "../actions/cartActions";
import CheckoutStep from "../components/shared/CheckoutStep";
import {useNavigate } from "react-router-dom";

const DeliveryPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
    const { deliveryAddress } = cart;
    
    const navigate = useNavigate();

  const [address, setAddress] = useState(deliveryAddress.address);
  const [city, setCity] = useState(deliveryAddress.city);
  const [postalCode, setPostalCode] = useState(deliveryAddress.postalCode);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryAddress({ address, city, postalCode}));
    navigate("/payment");
  };

  return (
    <>
          <CheckoutStep step1 step2 />
          <h1 style={{marginTop:"30px",color:"#386150"}}>Delivery Address</h1>
      <FormContainer sty>
        <Form onSubmit={submitHandler} style={{marginLeft:"100px"}}>
          <Form.Group controlId="address">
            <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
                          required
                          style={{maxWidth:"500px"}}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
                          required
                          style={{maxWidth:"300px"}}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label style={{marginTop:"20px", color: "#32CD32"}}>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postalcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
                          required
                          style={{maxWidth:"300px"}}
            ></Form.Control>
          </Form.Group>
          
          <Button type="Submit" variant="primary" style={{marginTop:"20px", marginLeft:"0px"}}>
            continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default DeliveryPage;
