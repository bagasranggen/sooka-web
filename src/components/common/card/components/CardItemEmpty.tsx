import React from 'react';
import { Col } from 'react-bootstrap';

const CardImageEmpty = ({ children }: { children: React.ReactNode }): React.ReactElement => (
    <Col>
        <div className="my-8 text-center fw-bold fs-30">{children}</div>
    </Col>
);

export default CardImageEmpty;
