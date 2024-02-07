import React from 'react';

import { Container } from 'react-bootstrap';
import Button from '@/components/common/button/Button';

export type AboutIndexProps = {};

const AboutIndex = ({}: AboutIndexProps): React.ReactElement => {
    // console.log('test');
    // console.log(COMMON_ANIMATIONS.BUTTON.RIPPLE);

    return <>
        <Container className="mt-10">
            <Button
                type="anchor"
                variant="ripple"
                color="light"
                href="/">TEST</Button>
            ABOUT US
        </Container>
    </>;
};

export default AboutIndex;