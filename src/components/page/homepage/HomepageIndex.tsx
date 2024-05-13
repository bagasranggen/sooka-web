import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { createAnimation } from '@/libs/factory';
import { HOW_TO_ORDER } from '@/libs/mock';

import Slider, { type SliderImageItemProps } from '@/components/common/slider/Slider';
import Card, { CardRoundedItemProps } from '@/components/common/card/Card';
import Heading from '@/components/common/heading/Heading';
import Picture, { PictureItemProps } from '@/components/common/picture/Picture';
import List from '@/components/common/list/List';

import eet from '../../../assets/images/eet.jpeg';
import pan from '../../../assets/images/pan.jpeg';

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
                    <Row className="justify-content-center gy-3 gy-md-6 gx-md-6">
                        <Col
                            className="order-last order-xl-first"
                            lg={10}
                            xl={5}>
                            <div {...createAnimation({ type: 'fade-in' })}>
                                <Picture
                                    className="d-none d-lg-block"
                                    items={[eet as PictureItemProps]}
                                    animation={{ type: 'parallax' }}
                                />
                            </div>
                        </Col>
                        <Col xl={7}>
                            <Heading
                                variant="section"
                                className="text-center"
                                options={{
                                    headingTag: 'h2',
                                }}>
                                Our Story
                            </Heading>

                            <div {...createAnimation({ type: 'fade-in' })}>
                                <p>
                                    Hi! Welcome to Sooka Baked Goods.
                                    <br />
                                    We offer an incredible range of cakes for your special occasions.
                                </p>

                                <p>
                                    The idea of Sooka began back in 2017, when I was randomly baking after a really
                                    loooong day.
                                    <br />
                                    Let me tell you, it felt <strong>magical</strong>.
                                </p>

                                <p>
                                    As a home baker, I have spent years transforming simple ingredients to
                                    mouth-watering delights for my loved ones.
                                    <br />
                                    They said, nothing compares to the scent of fresh-baked cakes or banana bread that
                                    came from my kitchen.
                                </p>

                                <p>Order now from our bakery and be a part of our growing family!</p>
                            </div>

                            <Picture
                                className="d-block d-lg-none mt-3"
                                items={[eet as PictureItemProps]}
                                animation={{ type: 'parallax' }}
                            />

                            <Picture
                                className="d-xl-block mt-3 mt-xl-6"
                                items={[pan as PictureItemProps]}
                                animation={{ type: 'parallax' }}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-10">
                <Container>
                    <Heading
                        variant="section"
                        className="text-center"
                        options={{
                            headingTag: 'h2',
                            offset: 2,
                            offsetAlign: 'center',
                        }}>
                        First Time Ordering?
                    </Heading>

                    <List
                        variant="point"
                        items={HOW_TO_ORDER}
                    />
                </Container>
            </section>

            {entries.highlight.length > 0 && (
                <section className="my-10">
                    <Container>
                        <Heading
                            variant="section"
                            subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam asperiores assumenda debitis dignissimos eius exercitationem facilis fuga ipsam labore laboriosam laborum libero maiores minima minus molestiae nam natus nesciunt omnis praesentium quia quos reiciendis repellat saepe sint, unde, veritatis. Aliquid at ducimus eius esse excepturi iusto pariatur provident voluptate!"
                            className="text-center"
                            options={{
                                headingTag: 'h2',
                                offset: 2,
                                offsetAlign: 'center',
                            }}>
                            Highlight
                        </Heading>

                        <div className="mt-6 mt-md-10">
                            <Card
                                variant="rounded"
                                items={entries.highlight}
                                options={{
                                    columns: 'row-cols-1 row-cols-md-2 row-cols-xl-3',
                                    gap: 'gy-4 gx-md-4',
                                }}
                            />
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
};

export default HomepageIndex;
