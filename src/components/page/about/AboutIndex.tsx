import React from 'react';

import { Container } from 'react-bootstrap';
import Button from '@/components/common/button/Button';
import Picture from '@/components/common/picture/Picture';
import { BANNER_CAROUSELS, PRODUCT_CATEGORY, PRODUCT_LISTING } from '@/libs/mock';
import Card from "@/components/common/card/Card";
import Filter from "@/components/common/filter/Filter";

export type AboutIndexProps = {};

const AboutIndex = ({}: AboutIndexProps): React.ReactElement => {
    // console.log('test');
    // console.log(COMMON_ANIMATIONS.BUTTON.RIPPLE);

    // console.log(BANNER_CAROUSELS[0].image);

    return <>
        <Container className="mt-10">
            <Filter
                variant="product"
                items={PRODUCT_CATEGORY} />
            <Card
                variant="image"
                items={PRODUCT_LISTING} />
        </Container>
    </>;
};

export default AboutIndex;