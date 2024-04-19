import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { createAnimation } from '@/libs/factory';

import Slider, { type SliderImageItemProps } from '@/components/common/slider/Slider';
import Card, { CardRoundedItemProps } from '@/components/common/card/Card';
import Heading from '@/components/common/heading/Heading';
import Picture, { PictureItemProps } from '@/components/common/picture/Picture';

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

                            <p {...createAnimation({ type: 'fade-in' })}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi aspernatur beatae
                                consectetur, cum deleniti dolores dolorum excepturi illo inventore iste iusto laboriosam
                                maiores nemo provident sed sint veniam voluptates!
                            </p>

                            <p {...createAnimation({ type: 'fade-in' })}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet deserunt, inventore?
                                Accusantium asperiores consequatur consequuntur, distinctio eius error eveniet ex id
                                minima minus, modi nam neque non qui saepe sunt vitae? Atque corporis deleniti ipsum
                                magni nobis ratione recusandae reprehenderit? Dolorem inventore libero placeat sapiente
                                sequi tenetur voluptates? Assumenda at aut beatae commodi debitis dolor eligendi
                                expedita hic, id illo impedit ipsum itaque laborum magni modi nam, non perspiciatis
                                porro, quam quasi quia temporibus vitae voluptates. Blanditiis, eligendi error est
                                facilis fugit ipsa ipsam iste, laborum nisi, omnis quae saepe sunt. Eius est ipsam
                                molestiae necessitatibus numquam obcaecati quam rem.
                            </p>

                            <Picture
                                className="d-xl-block mt-xl-4 "
                                items={[pan as PictureItemProps]}
                                animation={{ type: 'parallax' }}
                            />
                        </Col>
                    </Row>
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
        </>
    );
};

export default HomepageIndex;
