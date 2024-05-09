import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import { Col, Container, Row } from 'react-bootstrap';

import { GLOBAL_MESSAGE } from '@/libs/data/globalMessage';
import { getWhatsappEncoded } from '@/libs/utils';

import type { PictureItemProps } from '@/components/common/picture/Picture';
import Button, { ButtonGroup } from '@/components/common/button/Button';
import Slider from '@/components/common/slider/Slider';
import Rate from '@/components/common/rate/Rate';
import ProductDetailSection from '@/components/page/productDetail/components/ProductDetailSection';

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
                <Row className="justify-content-between gy-4 gx-lg-6 gx-xl-0">
                    <Col lg={6}>
                        <div className="product-detail__image">
                            <Slider
                                variant="vertical"
                                items={slides}
                            />
                        </div>
                    </Col>
                    <Col
                        lg={6}
                        xl={5}>
                        <div className="product-detail__content">
                            <div className="product-detail__title">
                                <h1>{title}</h1>
                                <h2 className={`mt-5${isSold ? ' is-sold' : ''}`}>{productPrice}</h2>
                            </div>

                            {description && (
                                <ProductDetailSection
                                    className="mt-5"
                                    title="Product Description">
                                    <div className="product-detail__description">{ReactHtmlParser(description)}</div>
                                </ProductDetailSection>
                            )}

                            <ProductDetailSection
                                className="mt-5"
                                title="Product Detail">
                                <div className="product-detail__details">
                                    <h4>Dimension</h4>
                                    <p>16cm x 16cm</p>
                                </div>

                                <div className="product-detail__details">
                                    <h4>Flavour</h4>
                                    <Rate
                                        variant="meter"
                                        value={30}
                                        start="Fresh"
                                        end="Creamy"
                                    />
                                    <Rate
                                        variant="meter"
                                        value={60}
                                        start="Custardy"
                                        end="Spongy"
                                    />
                                    <Rate
                                        variant="meter"
                                        value={70}
                                        start="Tangy"
                                        end="Sweet"
                                    />
                                </div>
                            </ProductDetailSection>

                            <ButtonGroup className="d-flex mt-5">
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
