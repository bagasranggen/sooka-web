import React from 'react';

import { CARD_VARIANTS } from '@/libs/handles/card';
import { Col, Row } from 'react-bootstrap';
import Picture, { PictureItemProps } from "@/components/common/picture/Picture";
import Button from "@/components/common/button/Button";

export type CardImageItemProps = {
    images: PictureItemProps[];
}

export type CardImageProps = {
    variant: typeof CARD_VARIANTS.IMAGE;
    items: CardImageItemProps[];
};

const CardImageItem = ({ images }: CardImageItemProps): React.ReactElement => {
    return <Col>
        <figure className="card card--image">
            <Picture items={images} />
            <figcaption className="card__caption">
                <h3>Category</h3>
                <h2>Product Name</h2>
                <p className="mb-0"><b>Ingredients: </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <Button
                    type="anchor"
                    href="/"
                    size="sm"
                    variant="ripple"
                    color="primary">BUY</Button>
            </figcaption>
        </figure>
    </Col>;
};

const CardImage = ({ items, variant }: CardImageProps): React.ReactElement => (
    <Row className={`row-cols-2 gy-4 gx-8`}>
        {items.map((item: CardImageItemProps, i: number) => <CardImageItem
            images={item.images}
            key={i} />)}
    </Row>
);

export default CardImage;