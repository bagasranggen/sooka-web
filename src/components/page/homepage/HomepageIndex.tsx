import React from 'react';

import { Container } from 'react-bootstrap';

import Slider, { type SliderImageItemProps } from '@/components/common/slider/Slider';
import Card, { CardRoundedItemProps } from '@/components/common/card/Card';

export type HomepageIndexProps = {
    entries: {
        carousel: SliderImageItemProps[];
        highlight: CardRoundedItemProps[];
    };
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return (
        <>
            <Slider
                variant="image"
                items={entries.carousel}
            />

            <section className="block block--secondary">
                <Container>
                    <h2 style={{ fontSize: '8rem', fontWeight: 200, marginBottom: '1rem' }}>Our Story</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam asperiores assumenda
                        debitis dignissimos eius exercitationem facilis fuga ipsam labore laboriosam laborum libero
                        maiores minima minus molestiae nam natus nesciunt omnis praesentium quia quos reiciendis
                        repellat saepe sint, unde, veritatis. Aliquid at ducimus eius esse excepturi iusto pariatur
                        provident voluptate!
                    </p>
                </Container>
            </section>

            <section className="my-10">
                <Container>
                    <div className="text-center">
                        <h2 style={{ fontSize: '8rem', fontWeight: 200, marginBottom: '1rem' }}>Highlight</h2>
                        <p style={{ fontSize: '2rem' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto doloribus
                            obcaecati pariatur sint vel.
                        </p>
                    </div>
                    <div className="mt-10">
                        <Card
                            variant="rounded"
                            items={entries.highlight}
                            options={{
                                columns: 'row-cols-1 row-cols-lg-3',
                                gap: 'g-4',
                            }}
                        />
                    </div>
                </Container>
            </section>
        </>
    );
};

export default HomepageIndex;
