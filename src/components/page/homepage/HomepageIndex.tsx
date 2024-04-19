import React from 'react';

import { Container } from 'react-bootstrap';

import Slider, { type SliderImageItemProps } from '@/components/common/slider/Slider';
import Card, { CardRoundedItemProps } from '@/components/common/card/Card';
import Heading from '@/components/common/heading/Heading';

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
                    <Heading
                        variant="section"
                        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam asperiores assumenda debitis dignissimos eius exercitationem facilis fuga ipsam labore laboriosam laborum libero maiores minima minus molestiae nam natus nesciunt omnis praesentium quia quos reiciendis repellat saepe sint, unde, veritatis. Aliquid at ducimus eius esse excepturi iusto pariatur provident voluptate!"
                        className="text-center"
                        options={{
                            headingTag: 'h2',
                        }}>
                        Our Story
                    </Heading>
                </Container>
            </section>

            <section className="my-10">
                <Container>
                    <Heading
                        variant="section"
                        subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam asperiores assumenda debitis dignissimos eius exercitationem facilis fuga ipsam labore laboriosam laborum libero maiores minima minus molestiae nam natus nesciunt omnis praesentium quia quos reiciendis repellat saepe sint, unde, veritatis. Aliquid at ducimus eius esse excepturi iusto pariatur provident voluptate!"
                        className="text-center"
                        options={{
                            headingTag: 'h2',
                        }}>
                        Highlight
                    </Heading>

                    <div className="mt-10">
                        <Card
                            variant="rounded"
                            items={entries.highlight}
                            options={{
                                columns: 'row-cols-1 row-cols-md-2 row-cols-xl-3',
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
