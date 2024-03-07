import React from 'react';

import { BANNER_VARIANTS } from '@/libs/handles';

import { Container } from 'react-bootstrap';

export type BannerSectionProps = {
    variant: typeof BANNER_VARIANTS.SECTION;
    title: string;
    description: string;
};

const BannerSection = ({ title, description }: BannerSectionProps): React.ReactElement => (
    <section className="ts--margin ts--primary banner banner--section">
        <Container>
            <div className="banner__title">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </Container>
    </section>
);

export default BannerSection;
