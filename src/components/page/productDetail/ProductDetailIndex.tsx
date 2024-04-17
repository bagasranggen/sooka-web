import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export type ProductDetailProps = {
    title: string;
};

const ProductDetailIndex = ({ title }: ProductDetailProps): React.ReactElement => {
    return (
        <section className="ts--margin pt-5 product-detail">
            <Container>
                <Row className="gx-lg-8">
                    <Col lg={7}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores commodi consectetur
                        corporis et eveniet exercitationem ipsam magnam nesciunt nostrum odio porro possimus quas qui
                        quia quibusdam quisquam tempore veritatis!
                    </Col>
                    <Col lg={5}>
                        <div className="product-detail__title">
                            <h1>{title}</h1>
                            <h2>
                                <span>Rp</span>150000
                            </h2>
                        </div>
                        <div className="text-center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dolor eveniet impedit iste
                            minima molestiae mollitia rem soluta suscipit. Accusamus at consequuntur facere fugit nam
                            necessitatibus neque quia temporibus vitae? Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Ab accusamus, cumque eligendi excepturi facere in incidunt nam sint
                            soluta! Deserunt dolores eaque itaque iusto pariatur, ullam voluptas. Aliquam deleniti,
                            dolor!
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProductDetailIndex;
