'use client';

import React from 'react';

import { layoutSlice, useDispatch } from '@/store/redux';

import { Col, Container, Row } from 'react-bootstrap';
import { useMeasure } from 'react-use';

import Icon from '@/components/common/icon/Icon';

export type FooterProps = {};

const Footer = ({}: FooterProps): React.ReactElement => {
    const dispatch = useDispatch();
    const [ footerRef, { height, top } ] = useMeasure();
    const footerHeight = height + top + 40;

    dispatch(layoutSlice.actions.layoutHeight({ '--footer-height': `${footerHeight}px` }));

    return <footer ref={footerRef as unknown as React.RefObject<HTMLElement>} className="mt-10 footer">
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
    </footer>;
};

export default Footer;