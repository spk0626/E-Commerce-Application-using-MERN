import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = ({ product }) => {
    return (
      <>
        <div style={{ margin: '20px 0' }}>

          <Card className="my-3 p-1 rounded" style={{ height: "500px" }}>

            <div style={{ display: "flex", flexDirection: "column", height: "50%" }}>
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" style={{ marginTop: "20px", marginBottom: "20px" }} />
              </Link>
            </div>

            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "50%" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div" className="text-center">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div className="my-3" style={{ color: "green" }}>
                    Rs. {product.price}
                  </div>
                </Card.Text>
                <Card.Text as="div" style={{ color: "#707070" }}>
                  Type: {product.type}
                </Card.Text>
              </div>
            </Card.Body>

          </Card>

        </div>
      </>
    );
};

export default ProductPage;