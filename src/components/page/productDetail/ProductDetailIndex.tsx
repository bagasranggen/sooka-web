import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import { Col, Container, Row } from 'react-bootstrap';

import { GLOBAL_MESSAGE } from '@/libs/data';
import { getWhatsappEncoded } from '@/libs/utils';

import type { PictureItemProps } from '@/components/common/picture/Picture';
import Button, { ButtonGroup } from '@/components/common/button/Button';
import Slider from '@/components/common/slider/Slider';

export type ProductDetailProps = {
    title?: string;
    description?: string;
    price: string;
    isSold: boolean;
    slides: Array<PictureItemProps[]>;
};

const ProductDetailIndex = ({ title, description, price, isSold, slides }: ProductDetailProps): React.ReactElement => {
    let productPrice = (
        <>
            <span>Rp</span>
            {price}
        </>
    );
    if (isSold) productPrice = <>{GLOBAL_MESSAGE.SOLD_OUT}</>;

    return (
        <section className="ts--margin py-8 product-detail">
            <Container>
                <Row className="justify-content-between gy-4">
                    <Col lg={6}>
                        <div className="product-detail__image">
                            <Slider
                                variant="vertical"
                                items={slides}
                            />
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className="product-detail__content">
                            <div className="product-detail__title">
                                <h1>{title}</h1>
                                <h2>{productPrice}</h2>
                            </div>
                            {description && (
                                <div className="product-detail__description">{ReactHtmlParser(description)}</div>
                            )}
                            <ButtonGroup className="d-flex mt-3">
                                <Button
                                    variant="rounded"
                                    type="anchor"
                                    href={getWhatsappEncoded(title ?? '')}
                                    disabled={isSold}>
                                    {isSold ? GLOBAL_MESSAGE.SOLD_OUT : 'Order'}
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetailIndex;
