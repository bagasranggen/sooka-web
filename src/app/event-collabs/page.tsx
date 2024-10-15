import React from 'react';
import { notFound } from 'next/navigation';

import { getWhatsappEncoded } from '@/libs/utils';
import { createAnimation } from '@/libs/factory';

import { reduxStore } from '@/store/redux';

import { Col, Container, Row } from 'react-bootstrap';

import Banner from '@/components/common/banner/Banner';
import Picture from '@/components/common/picture/Picture';
import Button, { ButtonGroup } from '@/components/common/button/Button';

export type PageProps = {};

const Page = ({}: PageProps): React.ReactElement => {
    const { globalInfo } = reduxStore.getState();

    if (!globalInfo.ffSpecialEvents) {
        return notFound();
    }

    return (
        <>
            <Banner
                variant="section"
                title="Cake Decorating <br /> Package"
                description="Unleash your creativity with our delightful Cake Decorating Package! Perfect for birthdays, parties, or just a fun gathering with friends, this package promises a memorable and delicious experience. Each mini cake serves as a blank canvas for your artistic flair!"
            />

            <section
                className="mt-10"
                {...createAnimation({ type: 'fade-in' })}>
                <Container>
                    <Row className="align-items-center gy-3">
                        <Col md={5}>
                            <Picture
                                items={[
                                    {
                                        src: 'https://picsum.photos/id/15/600/700',
                                        width: 600,
                                        height: 700,
                                        media: 992,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/300/700',
                                        width: 300,
                                        height: 700,
                                        media: 768,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/300',
                                        width: 400,
                                        height: 300,
                                        alt: 'a',
                                    },
                                ]}
                            />
                        </Col>

                        <Col md={7}>
                            <p className="mb-0 fs-24">Minimum Order: 5 pcs</p>
                            <p className="fs-24">Price: Rp. 95.000 / pcs</p>
                            <b className="mb-0 fs-20">What&apos;s Included:</b>
                            <ul>
                                <li>Mini Cake: 10 cm diameter, covered with our signature whipped cream.</li>
                                <li>
                                    Decorating Kit:
                                    <ul>
                                        <li>3 colors of vanilla or chocolate whipped cream in piping bags.</li>
                                        <li>Fresh or canned fruit (based on cake flavor).</li>
                                        <li> Edible leaves (rosemary & thyme).</li>
                                    </ul>
                                </li>
                                <li>Sprinkles and gold flakes for decoration.</li>
                            </ul>
                            <b className="mb-0 fs-20 ">Available Flavors:</b>
                            <ul>
                                <li>Choco Banana</li>
                                <li>Mixberry Lemon</li>
                                <li>Rose Lychee</li>
                                <li>Jasmine Mandarin</li>
                                <li>Strawberry Shortcake</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section
                className="mt-10"
                {...createAnimation({ type: 'fade-in' })}>
                <Container>
                    <Row className="align-items-center gy-3">
                        <Col
                            md={5}
                            lg={4}
                            className="order-last order-md-first">
                            <b className="mb-0 fs-20">Order Guidelines:</b>
                            <ul>
                                <li>5 - 10 pcs: Max. 2 flavors</li>
                                <li>10 - 20 pcs: Max. 3 flavors</li>
                                <li>20 pcs and up: Up to 5 flavors</li>
                            </ul>
                            <b className="mb-0 fs-20">Add-Ons:</b>
                            <ul>
                                <li>Birthday Topper: Rp. 2.000 / pc</li>
                                <li>Single Spiral Candle: Rp. 3.000 / pc</li>
                                <li>
                                    Standard Documentation: Rp. 150.000 (for up to 1 hour during cake decorating,
                                    includes high-res raw files)
                                </li>
                            </ul>
                        </Col>

                        <Col
                            md={7}
                            lg={8}
                            className="order-first order-md-last">
                            <Picture
                                items={[
                                    {
                                        src: 'https://picsum.photos/id/15/800/600',
                                        width: 800,
                                        height: 600,
                                        media: 992,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/400',
                                        width: 400,
                                        height: 400,
                                        media: 768,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/300',
                                        width: 400,
                                        height: 300,
                                        media: 768,
                                        alt: 'a',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section
                className="mt-10"
                {...createAnimation({ type: 'fade-in' })}>
                <Container fluid>
                    <Row className="gy-3 justify-content-center">
                        <Col md={4}>
                            <Picture
                                items={[
                                    {
                                        src: 'https://picsum.photos/id/15/900/600',
                                        width: 900,
                                        height: 600,
                                        media: 992,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/300',
                                        width: 400,
                                        height: 300,
                                        alt: 'a',
                                    },
                                ]}
                            />
                        </Col>
                        <Col md={4}>
                            <Picture
                                items={[
                                    {
                                        src: 'https://picsum.photos/id/15/900/600',
                                        width: 900,
                                        height: 600,
                                        media: 992,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/300',
                                        width: 400,
                                        height: 300,
                                        alt: 'a',
                                    },
                                ]}
                            />
                        </Col>
                        <Col md={4}>
                            <Picture
                                items={[
                                    {
                                        src: 'https://picsum.photos/id/15/900/600',
                                        width: 900,
                                        height: 600,
                                        media: 992,
                                        alt: 'a',
                                    },
                                    {
                                        src: 'https://picsum.photos/id/15/400/300',
                                        width: 400,
                                        height: 300,
                                        alt: 'a',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section
                className="mt-10 mb-10"
                {...createAnimation({ type: 'fade-in' })}>
                <Container>
                    <Row className="justify-content-center">
                        <Col
                            md={8}
                            className="text-center fs-30 fs-md-50"
                            style={{ lineHeight: 1.1 }}>
                            <p className="">Ready to create some deliciously decorated cakes?</p>

                            <ButtonGroup className="d-flex justify-content-center mt-5">
                                <Button
                                    variant="rounded"
                                    type="anchor"
                                    className="fs-md-20"
                                    openNewTab
                                    href={getWhatsappEncoded('')}>
                                    Let&apos;s Collabs
                                    {/*{isSold ? GLOBAL_MESSAGE.SOLD_OUT : 'Order'}*/}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Page;
