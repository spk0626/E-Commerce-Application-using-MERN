import React,{useEffect} from "react";
import Message from "../components/shared/Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const qty = location && location.search ? Number(location.search.split("=")[1]) : 1;

  console.log(qty);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (id) {
        dispatch(addToCart(id, qty));
      }
    }
  }, [dispatch, id, qty, navigate, userInfo]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    navigate("/delivery");
  };

  return (
    <>
     <Row>
        <Col md={8}>
          <h1 style={{marginBottom:"10px", color:"#386150"}} >Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty! <Link to="/">Go Back</Link>
            </Message>
          ) : (
              <ListGroup variant="flush" style={{ marginTop: "40px"}}>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>Rs.{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        style={{maxWidth: "60px"}}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{marginTop:"15px"}}
                      >
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
          <div style={{marginTop: "20px"}}>
            <Link to="/" style={{fontSize: "16px", fontWeight: "500", color: "#9169c1"}}>
              Browse More Products
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <Card style={{marginTop:"60px", marginLeft:"70px"}}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                Rs.
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
             
            </ListGroup>
           
          </Card>
          <Button
            type="button"
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkout}
            style={{marginTop:"30px", marginLeft:"160px"}}
          >
            Proceed to CheckOut
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
