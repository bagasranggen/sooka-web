import React from 'react';

import { Container } from 'react-bootstrap';
import Button from '@/components/common/button/Button';
import Picture from '@/components/common/picture/Picture';
import { BANNER_CAROUSELS } from '@/libs/mock';

export type AboutIndexProps = {};

const AboutIndex = ({}: AboutIndexProps): React.ReactElement => {
    // console.log('test');
    // console.log(COMMON_ANIMATIONS.BUTTON.RIPPLE);

    // console.log(BANNER_CAROUSELS[0].image);

    return <>
        <Container className="mt-10">
            <Button
                type="anchor"
                variant="ripple"
                color="light"
                href="/">TEST</Button>
            <Picture items={BANNER_CAROUSELS[0].image} />
        </Container>
    </>;
};

export default AboutIndex;