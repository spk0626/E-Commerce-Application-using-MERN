import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

const Footer = () => {
    return (
        <div>
            <>
                <footer>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <span> Copyright &copy; Your Garden Pvt Ldt </span>
                            </Col>
                        </Row>

                    </Container>
                </footer>
            </>
        </div>
    );
};

export default Footer;