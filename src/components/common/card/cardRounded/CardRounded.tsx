import React from 'react';

import { CARD_VARIANTS } from '@/libs/handles';
import { GLOBAL_MESSAGE } from '@/libs/data';
import { getWhatsappEncoded, joinClassnameString } from '@/libs/utils';
import { createAnimation } from '@/libs/factory';

import { Col, Row } from 'react-bootstrap';
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
    isSold: boolean;
};

export type CardRoundedProps = {
    variant: typeof CARD_VARIANTS.ROUNDED;
    items: CardRoundedItemProps[];
    options?: {
        columns?: string;
        gap?: string;
    };
};

const CardRoundedItem = ({ name, href, images, price, isSold }: CardRoundedItemProps): React.ReactElement => {
    let productPrice = (
        <>
            <span>Rp</span>
            {price}
        </>
    );
    if (isSold) productPrice = <>{GLOBAL_MESSAGE.SOLD_OUT}</>;

    return (
        <Col>
            <div
                className="card card--rounded"
                {...createAnimation({ type: 'fade-in' })}>
                <Button
                    variant="base"
                    type="anchor"
                    href={href}>
                    <div className="card__title">
                        <h2>{name}</h2>
                        <h3>{productPrice}</h3>
                    </div>

                    <Picture
                        className="card__image"
                        items={images}
                    />
                </Button>

                {!isSold && (
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
                )}
            </div>
        </Col>
    );
};

const CardRounded = ({ items, options }: CardRoundedProps): React.ReactElement => {
    const isEmpty = items.length === 0;

    let rowColumns: string[] = [];
    if (!isEmpty && !options?.columns) rowColumns.push('row-cols-1 row-cols-sm-2');
    if (!isEmpty && options?.columns) rowColumns.push(options.columns);

    let rowGap: string[] = [];
    if (!options?.gap) rowGap.push('gy-4 gy-lg-6 gx-lg-8');
    if (options?.gap) rowGap.push(options.gap);

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
