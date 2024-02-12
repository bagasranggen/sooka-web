import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import Form from '@/components/common/form/Form';

export type PageProps = {};

const Page = ({}: PageProps): React.ReactElement => {
    return (
        <>
            <section className="ts--padding mt-10">
                <Container>
                    <Row className="row-cols-2">
                        <Col>
                            <h1>Lorem ipsum dolor sit amet, consectetur.</h1>
                        </Col>
                        <Col>
                            <Form variant="contact" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Page;