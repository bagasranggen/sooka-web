import React from 'react';

import { CARD_VARIANTS } from '@/libs/handles';

import { Col, Row } from 'react-bootstrap';
import { getWhatsappEncoded, joinClassnameString } from '@/libs/utils';

import { CiShoppingCart } from 'react-icons/ci';

import Picture, { type PictureItemProps } from '@/components/common/picture/Picture';
import CardItemEmpty from '@/components/common/card/components/CardItemEmpty';
import Button from '@/components/common/button/Button';

export type CardRoundedItemProps = {
    name: string;
    href: string;
    category: string;
    isPackage?: boolean;
    ingredients?: string;
    package?: string;
    images: PictureItemProps[];
    price: string;
};

export type CardRoundedProps = {
    variant: typeof CARD_VARIANTS.ROUNDED;
    items: CardRoundedItemProps[];
};

const CardRoundedItem = ({ name, href, images, price }: CardRoundedItemProps): React.ReactElement => {
    return (
        <Col>
            <div className="card card--rounded">
                <Button
                    variant="base"
                    type="anchor"
                    href={href}>
                    <div className="card__title">
                        <h2>{name}</h2>
                        <h3>
                            <span>Rp</span>
                            {price}
                        </h3>
                    </div>

                    <Picture
                        className="card__image"
                        items={images}
                    />
                </Button>

                <Button
                    variant="base"
                    type="anchor"
                    className="card__button"
                    href={getWhatsappEncoded(name)}>
                    <div className="button__text">ORDER</div>
                    <div className="button__icon">
                        <CiShoppingCart size={40} />
                    </div>
                </Button>
            </div>
        </Col>
    );
};

const CardRounded = ({ items }: CardRoundedProps): React.ReactElement => {
    const isEmpty = items.length === 0;

    const rowColumns = isEmpty ? [] : ['row-cols-1', 'row-cols-sm-2'];
    const rowGap = ['gy-4', 'gy-lg-6', 'gx-lg-8'];
    const rowClass = joinClassnameString([...rowColumns, ...rowGap]);

    let cards;
    if (isEmpty) {
        cards = <CardItemEmpty>EMPTY</CardItemEmpty>;
    }
    if (!isEmpty) {
        cards = items.map((item: any, i: number) => (
            <CardRoundedItem
                key={i}
                {...item}
            />
        ));
    }

    return <Row className={rowClass}>{cards}</Row>;
};

export default CardRounded;
