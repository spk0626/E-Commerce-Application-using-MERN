import React, {useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Image, ListGroupItem, Form } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/shared/loader";
import Message from "../components/shared/Message";

const ProductDetails = () => {

    const [qty, setQty] = useState(1);

    const { id } = useParams();
    const navigate = useNavigate();
   

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    

    useEffect(() => {
      
            dispatch(listProductDetails(id));
        
    },[dispatch, id]); 

    const addToCartHandler = () => {
       navigate(`/cart/${id}?qty=${qty}`);
    };
   
    return (
        <div>
            {/* <Link to="/" style={{color: black}}>
                <i className="fas fa-arrow-left" style={{color: black}}></i>
                &nbsp; Go Back</Link> */}
            {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :
                (<Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} style={{ marginTop: "20px", marginBottom: "20px" }} fluid />
                    </Col>
                    <Col md={3} >
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3 style={{ color: "#386150", margin: "20px 0" }}>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                Category : {product.category}
                            </ListGroupItem>
                            <ListGroupItem>
                                Type : {product.type}
                            </ListGroupItem>
                            <ListGroupItem>
                                Size : {product.size}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description : {product.description}
                            </ListGroupItem>
                            <ListGroupItem style={{ color: "#FFA500" }}>
                                Price : Rs. {product.price}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    <div style={{ backgroundColor: "#A8E4A0", padding: "10px", margin: "50PX 60px", maxWidth: "180px" }}>
                                        <p style={{ color: "#00703C", margin: 0 }}>
                                            Status: {product.countInStock > 0 ? `${product.countInStock} Available` : "Out of stock"}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>

                        {
                            product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col style={{color:"#9169c1", marginLeft:"75px", marginTop:"10px"}} >Quantity</Col>
                                        <Form.Control
                                            as="select"
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            style={{ color: "#8A496B", marginRight:"100px",maxWidth: "60px" }} 
                                        >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                        </Form.Control>
                                    </Row>
                                </ListGroupItem>
                            )
                        }

                        <ListGroupItem>
                            <Button className="btn-block" type="button" style={{ margin: "80px 80px" }} onClick={addToCartHandler}>
                                <i className="fa-solid fa-cart-shopping" style={{ marginRight: "10px" }}></i>
                                Add to Cart
                            </Button>
                        </ListGroupItem>
                    </Col>
                </Row>)}
        </div>
    );
};

export default ProductDetails;