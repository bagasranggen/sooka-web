import React from 'react';

import { CARD_VARIANTS } from '@/libs/handles';
import { getWhatsappEncoded } from '@/libs/utils';

import { Col, Row } from 'react-bootstrap';
import Picture, { PictureItemProps } from '@/components/common/picture/Picture';
import Button from '@/components/common/button/Button';

export type CardImageItemProps = {
    name: string;
    category: string;
    ingredients: string;
    images: PictureItemProps[];
}

export type CardImageProps = {
    variant: typeof CARD_VARIANTS.IMAGE;
    items: CardImageItemProps[];
};

const CardImageEmpty = ({ children }: { children: React.ReactNode }): React.ReactElement => (
    <Col>
        <div className="my-8 text-center fw-bold">
            {children}
        </div>
    </Col>
);

const CardImageItem = ({ name, category, ingredients, images }: CardImageItemProps): React.ReactElement => {
    return <Col>
        <figure className="card card--image">
            <Picture
                items={images}
                animation={{ type: 'image-zoom' }} />
            <figcaption className="card__caption">
                {/*<h3>{category}</h3>*/}
                <h2>{name}</h2>
                <p>
                    <b>Ingredients: </b>
                    {ingredients}
                </p>
                <Button
                    type="anchor"
                    href={`getWhatsappEncoded(name)`}
                    size="sm"
                    variant="ripple"
                    color="primary"
                    openNewTab>BUY</Button>
            </figcaption>
        </figure>
    </Col>;
};

const CardImage = ({ items }: CardImageProps): React.ReactElement => {
    const isEmpty = items.length === 0;

    return (
        <Row className={`${isEmpty ? '' : 'row-cols-1 row-cols-md-2 '}gy-4 gx-lg-8`}>
            {!isEmpty ? items.map((item: CardImageItemProps, i: number) => <CardImageItem key={i} {...item} />) : <CardImageEmpty>No Product Found</CardImageEmpty>}
        </Row>
    );
};

export default CardImage;