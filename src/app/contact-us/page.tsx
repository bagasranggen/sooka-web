import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import Form from '@/components/common/form/Form';

export type PageProps = {};

const Page = ({}: PageProps): React.ReactElement => {
    return (
        <>
            <section className="ts--padding mt-10">
                <Container>
                    <Row className="gx-lg-6">
                        <Col lg={5}>
                            <h1 className="fs-80 fw-300">Can We Help?</h1>
                        </Col>
                        <Col lg={7}>
                            <Form variant="contact" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Page;