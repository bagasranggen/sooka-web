import React from 'react';

import { CARD_VARIANTS } from '@/libs/handles/card';
import { Col, Row } from 'react-bootstrap';

export type CardImageItemProps = {}

export type CardImageProps = {
    variant: typeof CARD_VARIANTS.IMAGE;
    items: CardImageItemProps[];
};

const CardImageItem = ({}: CardImageItemProps): React.ReactElement => {
    return <Col>CARD ITEM</Col>;
};

const CardImage = ({ items }: CardImageProps): React.ReactElement => (
    <Row>
        {items.map((item: CardImageItemProps, i: number) => <CardImageItem key={i} />)}
    </Row>
);

export default CardImage;