import React, { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col } from "react-bootstrap";
import ProductPage from "./ProductPage";
import Loader from "../components/shared/loader";
import Message from "../components/shared/Message";

const HomeScreen = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;


    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    
    return (
        <>
            <div style={{
                padding: '40px 0',
                marginBottom: '30px',
                background: 'linear-gradient(135deg, #D5F4E6 0%, rgba(39, 174, 96, 0.1) 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginLeft: '-12px',
                marginRight: '-12px',
                paddingLeft: '20px'
            }}>
                <i className="fa-solid fa-leaf" style={{
                    color: "#27AE60", 
                    fontSize: "48px"
                }}></i>
                <div>
                    <h1 style={{ 
                        color: "#27AE60", 
                        margin: '0',
                        fontWeight: '700',
                        fontSize: '40px',
                        letterSpacing: '1px'
                    }}>Your Garden</h1>
                    <p style={{
                        color: "#52BE80",
                        margin: '5px 0 0 0',
                        fontSize: '16px',
                        fontWeight: '500'
                    }}>Explore our beautiful collection of plants & gardening tools</p>
                </div>
            </div>

            {
                loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :
               (    <Row style={{marginTop: '30px'}}>
                        {products.map
                            ((product) =>
                                (
                                    <Col key={product._id} md={2} xs={6} style={{marginBottom: '25px'}}>
                                        <ProductPage product={product} />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                )
            }
            
        </>
    );
};

export default HomeScreen;