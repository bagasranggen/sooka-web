import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Icon from "@/components/common/icon/Icon";

export type FooterProps = {};

const Footer = ({}: FooterProps): React.ReactElement => (
    <footer className="mt-15 footer">
        <Container>
            <Row className="justify-content-center">
                <Col lg={10}>
                    <div className="footer__logo">
                        <Icon
                            variant="sooka"
                            color="light" />
                    </div>

                    <div className="mt-5">
                        <Row className="justify-content-between">
                            <Col lg="auto">
                                Lorem ipsum dolor sit amet.

                            </Col>
                            <Col lg="auto">
                                Lorem ipsum dolor sit amet.

                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;