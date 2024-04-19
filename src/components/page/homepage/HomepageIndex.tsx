import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { createAnimation } from '@/libs/factory';

import Slider, { type SliderImageItemProps } from '@/components/common/slider/Slider';
import Card, { CardRoundedItemProps } from '@/components/common/card/Card';
import Heading from '@/components/common/heading/Heading';
import Picture from '@/components/common/picture/Picture';

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

            <section className="block block--secondary ">
                <Container>
                    <Row className="justify-content-center gy-3 gy-md-6 gx-md-6">
                        <Col
                            className="order-last order-xl-first"
                            lg={10}
                            xl={5}>
                            <div {...createAnimation({ type: 'fade-in' })}>
                                <Picture
                                    items={[
                                        {
                                            src: 'https://picsum.photos/id/42/800/900',
                                            width: 800,
                                            height: 900,
                                            media: 1200,
                                            alt: 'alt',
                                        },
                                        {
                                            src: 'https://picsum.photos/id/42/1200/500',
                                            width: 1200,
                                            height: 500,
                                            alt: 'alt',
                                        },
                                    ]}
                                    animation={{ type: 'parallax' }}
                                />
                            </div>
                        </Col>
                        <Col xl={7}>
                            <Heading
                                variant="section"
                                // subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, aperiam asperiores assumenda debitis dignissimos eius exercitationem facilis fuga ipsam labore laboriosam laborum libero maiores minima minus molestiae nam natus nesciunt omnis praesentium quia quos reiciendis repellat saepe sint, unde, veritatis. Aliquid at ducimus eius esse excepturi iusto pariatur provident voluptate!"
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
                        </Col>
                    </Row>

                    <Row className="gy-3 gy-md-6 justify-content-center">
                        <Col
                            className="order-last order-xl-first"
                            md={10}>
                            <div {...createAnimation({ type: 'fade-in' })}>
                                <Picture
                                    className="d-xl-block mt-xl-8"
                                    items={[
                                        {
                                            src: 'https://picsum.photos/id/42/1200/500',
                                            width: 1200,
                                            height: 500,
                                            alt: 'alt',
                                        },
                                    ]}
                                    animation={{ type: 'parallax' }}
                                />
                            </div>
                        </Col>
                        <Col xs={12}>
                            <p
                                className="mt-3 mt-md-6 mt-xl-0"
                                {...createAnimation({ type: 'fade-in' })}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut beatae cum
                                dignissimos ducimus error, exercitationem facere facilis impedit itaque iure, magni
                                minus necessitatibus neque optio pariatur placeat provident qui rem repellat, sint sit
                                veniam voluptates voluptatum. Ad aperiam architecto, asperiores autem consequatur
                                cupiditate debitis distinctio dolore doloremque ea, earum eius eum explicabo harum id
                                illo in itaque libero molestias nam nulla numquam odit officia perspiciatis praesentium
                                quae quaerat quidem quo ratione repellendus reprehenderit saepe sint temporibus unde
                                veritatis vitae voluptatibus! Atque cum dolores doloribus enim explicabo fugiat
                                necessitatibus repellat sequi tenetur. Aliquam amet consequuntur cum debitis delectus,
                                dolorum eaque excepturi expedita explicabo fugit ipsam ipsum iste iure iusto laboriosam
                                magni minus natus nemo nesciunt, omnis perspiciatis possimus quis quod saepe sapiente
                                sed sit temporibus ut veritatis voluptatem. Aliquam dicta eveniet ipsum nostrum quae
                                quidem rerum similique tenetur. Ab architecto consectetur consequuntur culpa cumque
                                doloremque earum est in minus perspiciatis quae quas quis, ratione rem repellendus vel
                                voluptas voluptatem. Amet debitis, dolores enim est illum magnam molestiae temporibus
                                tenetur ut! Ad amet aspernatur aut autem delectus dignissimos distinctio dolorum ducimus
                                eos fugiat illo laboriosam necessitatibus omnis perferendis porro, possimus, provident
                                quaerat quo reiciendis repellat temporibus tenetur ut velit voluptatibus?
                            </p>
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
