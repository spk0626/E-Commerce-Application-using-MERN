import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

const Footer = () => {
    return (
        <div>
            <>
                <footer style={{
                    background: 'linear-gradient(135deg, #0B3D0B 0%, #1a5d1a 100%)',
                    color: '#FFFFFF',
                    padding: '40px 20px',
                    marginTop: '60px',
                    textAlign: 'center',
                    borderTop: '3px solid #27AE60',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)'
                }}>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px'}}>
                                    <i className="fa-solid fa-leaf" style={{fontSize: '24px', color: '#52BE80'}}></i>
                                    <span style={{fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px'}}>Your Garden</span>
                                </div>
                                <span style={{fontSize: '14px', fontWeight: '500', letterSpacing: '0.5px'}}> 
                                    Copyright © Your Garden Pvt Ltd. All rights reserved.
                                </span>
                                <div style={{marginTop: '15px', fontSize: '12px', opacity: '0.8'}}>
                                    Growing green spaces, one plant at a time
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        </div>
    );
};

export default Footer;