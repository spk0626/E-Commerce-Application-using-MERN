import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductPage = ({ product }) => {
    return (
      <>
        <div style={{ margin: '0' }}>

          <Card className="my-3 p-3 rounded" style={{ 
            height: "500px",
            background: '#FFFFFF',
            border: 'none',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.12)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: '12px'
          }} 
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(39, 174, 96, 0.25)';
            e.currentTarget.style.transform = 'translateY(-8px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.12)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>

            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              height: "50%",
              background: 'linear-gradient(135deg, #D5F4E6 0%, rgba(82, 190, 128, 0.1) 100%)',
              borderRadius: '8px',
              padding: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <Link to={`/product/${product._id}`} style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Card.Img src={product.image} variant="top" style={{ 
                  maxHeight: "150px",
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }} />
              </Link>
            </div>

            <Card.Body style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "center", 
              height: "50%",
              padding: '16px'
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '12px' }}>
                <Link to={`/product/${product._id}`} style={{width: '100%'}}>
                  <Card.Title as="div" className="text-center" style={{
                    color: '#1A3A1A',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '1.3',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#27AE60';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#1A3A1A';
                  }}>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div className="my-2" style={{ 
                    color: "#27AE60",
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    Rs. {product.price}
                  </div>
                </Card.Text>
                <Card.Text as="div" style={{ 
                  color: "#555555",
                  fontSize: '13px',
                  background: '#F8FAF5',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: '500'
                }}>
                  {product.type}
                </Card.Text>
              </div>
            </Card.Body>

          </Card>

        </div>
      </>
    );
};

export default ProductPage;