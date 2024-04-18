import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import { Col, Container, Row } from 'react-bootstrap';

import { getWhatsappEncoded } from '@/libs/utils';

import Picture, { PictureItemProps } from '@/components/common/picture/Picture';
import Button, { ButtonGroup } from '@/components/common/button/Button';

export type ProductDetailProps = {
    title: string;
    description?: string;
    price: string;
    slides: Array<PictureItemProps[]>;
};

const ProductDetailIndex = ({ title, description, price, slides }: ProductDetailProps): React.ReactElement => {
    return (
        <section className="ts--margin py-8 product-detail">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={11}>
                        <Row className="justify-content-between gy-4">
                            <Col lg={6}>
                                <div className="product-detail__image">
                                    {slides.map((slide: any, i: number) => (
                                        <Picture
                                            key={i}
                                            items={slide}
                                        />
                                    ))}
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="product-detail__content">
                                    <div className="product-detail__title">
                                        <h1>{title}</h1>
                                        <h2>
                                            <span>Rp</span>
                                            {price}
                                        </h2>
                                    </div>
                                    {description && (
                                        <div className="product-detail__description">
                                            {ReactHtmlParser(description)}
                                        </div>
                                    )}
                                    <ButtonGroup className="d-flex mt-3">
                                        <Button
                                            variant="rounded"
                                            type="anchor"
                                            href={getWhatsappEncoded(title)}>
                                            Order
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetailIndex;
