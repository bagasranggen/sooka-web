import React from 'react';

import { BANNER_VARIANTS } from '@/libs/handles';
import { createAnimation } from '@/libs/factory';

import { Container } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

export type BannerSectionProps = {
    variant: typeof BANNER_VARIANTS.SECTION;
    title: string;
    description: string;
};

const BannerSection = ({ title, description }: BannerSectionProps): React.ReactElement => (
    <section className="ts--margin ts--primary banner banner--section">
        <Container>
            <div
                className="banner__title"
                {...createAnimation({ type: 'fade-in' })}>
                <h1>{title}</h1>
                <div className="">{ReactHtmlParser(description)}</div>
            </div>
        </Container>
    </section>
);

export default BannerSection;
