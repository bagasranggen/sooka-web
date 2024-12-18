import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { GLOBAL_MESSAGE } from '@/libs/data/globalMessage';
import { getWhatsappEncoded } from '@/libs/utils';

import type { PictureItemProps } from '@/components/common/picture/Picture';
import Button, { ButtonGroup } from '@/components/common/button/Button';
import Slider from '@/components/common/slider/Slider';
import Rate, { RateMeterProps } from '@/components/common/rate/Rate';
import ProductDetailSection from '@/components/page/productDetail/components/ProductDetailSection';

type ProductDetailFlavourProps = Pick<RateMeterProps, 'start' | 'end' | 'value'>;

export type ProductDetailProps = {
    title?: string;
    description?: string;
    price: string;
    priceSpecial?: string;
    priceSpecialLabel?: string;
    isSold: boolean;
    slides: Array<PictureItemProps[]>;
    packages: any;
    details: {
        dimension: string;
        flavours: ProductDetailFlavourProps[] | boolean;
    };
};

const ProductDetailIndex = ({
    title,
    description,
    price,
    priceSpecial,
    priceSpecialLabel,
    isSold,
    slides,
    packages,
    details,
}: ProductDetailProps): React.ReactElement => {
    let specialPrice: string | React.ReactNode = price;
    if (priceSpecial)
        specialPrice = (
            <>
                <s>{price}</s> {priceSpecial}
            </>
        );

    let productPrice = (
        <>
            {priceSpecialLabel ? <div className="fs-18 text-capitalize lh-1">{priceSpecialLabel}</div> : null}
            <span>Rp</span>
            {specialPrice}
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
                                <h2 className={`mt-3 mt-lg-5${isSold ? ' is-sold' : ''}`}>{productPrice}</h2>
                            </div>

                            {description && (
                                <ProductDetailSection
                                    className="mt-3 mt-lg-5"
                                    title="Product Description">
                                    <div className="product-detail__description">{description}</div>
                                </ProductDetailSection>
                            )}

                            {packages && (
                                <ProductDetailSection
                                    className="mt-3 mt-lg-5"
                                    title="Product Package">
                                    <div className="product-detail__description">{packages}</div>
                                </ProductDetailSection>
                            )}

                            <ProductDetailSection
                                className="mt-5"
                                title="Product Detail">
                                <div className="product-detail__details">
                                    <h4>Dimension</h4>
                                    <p>{details.dimension}</p>
                                </div>

                                {typeof details.flavours !== 'boolean' && (
                                    <div className="product-detail__details">
                                        <h4>Flavour</h4>
                                        {details.flavours.map((item: ProductDetailFlavourProps, i: number) => (
                                            <Rate
                                                key={i}
                                                variant="meter"
                                                value={item.value}
                                                start={item.start}
                                                end={item.end}
                                            />
                                        ))}
                                    </div>
                                )}
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
