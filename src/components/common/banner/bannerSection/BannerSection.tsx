import React from 'react';

import { BANNER_VARIANTS } from '@/libs/handles';
import { createAnimation } from '@/libs/factory';

import { Container } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

export type BannerSectionProps = {
    variant: typeof BANNER_VARIANTS.SECTION;
    title: string;
    description?: string;
};

const BannerSection = ({ title, description }: BannerSectionProps): React.ReactElement => (
    <section
        className="ts--margin ts--primary banner banner--section"
        {...createAnimation({ type: 'fade-in' })}>
        <Container>
            <div className="banner__title">
                <h1
                    {...(!description ? { className: 'mb-0' } : {})}
                    {...createAnimation({ type: 'fade-in', delay: 0.1 })}>
                    {ReactHtmlParser(title)}
                </h1>
                {description && (
                    <div {...createAnimation({ type: 'fade-in', delay: 0.175 })}>{ReactHtmlParser(description)}</div>
                )}
            </div>
        </Container>
    </section>
);

export default BannerSection;
