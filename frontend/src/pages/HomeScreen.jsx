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
            <Row>
                <i className="fa-brands fa-pagelines" style={{color: "#8FD400", fontSize: "24px", marginTop:"10px", marginLeft:"285px"}}></i>
                <h1 style={{ color: "#8FD400", marginTop:"-40px", marginLeft:"20px" }} >Your Garden</h1>
            </Row>
            {
                loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :
               (    <Row>
                        {products.map
                            ((product) =>
                                (
                                    <Col key={product._id} md={2}>
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