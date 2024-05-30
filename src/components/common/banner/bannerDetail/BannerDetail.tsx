import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export type BannerDetailProps = {};

const BannerDetail = ({}: BannerDetailProps): React.ReactElement => {
    return (
        <section className="ts--margin pt-5">
            <Container>
                <Row className="gx-lg-8">
                    <Col lg={7}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores commodi consectetur
                        corporis et eveniet exercitationem ipsam magnam nesciunt nostrum odio porro possimus quas qui
                        quia quibusdam quisquam tempore veritatis!
                    </Col>
                    <Col lg={5}>
                        <div className="text-center">
                            <h1>Mocca Nugget</h1>
                            <h2>Rp150000</h2>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dolor eveniet impedit iste
                        minima molestiae mollitia rem soluta suscipit. Accusamus at consequuntur facere fugit nam
                        necessitatibus neque quia temporibus vitae? Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ab accusamus, cumque eligendi excepturi facere in incidunt nam sint soluta! Deserunt
                        dolores eaque itaque iusto pariatur, ullam voluptas. Aliquam deleniti, dolor!
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BannerDetail;
