import React from 'react';

import { Container } from 'react-bootstrap';
import Slider from '@/components/common/slider/Slider';
import type { SliderImageProps } from '@/components/common/slider/sliderImage/SliderImage';

export type HomepageIndexProps = {

    entries: {
        carousel: SliderImageProps['items']
    }
};

const HomepageIndex = ({ entries }: HomepageIndexProps): React.ReactElement => {
    return <>
        <Slider
            variant="image"
            items={entries.carousel} />

        <section className="mt-10">
            <Container>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et facere hic id illum iste non reiciendis rem rerum sed voluptatem? Amet at corporis dolores
                    earum error fugit sit. Accusamus adipisci culpa debitis dignissimos facere laborum, odit perferendis quia rem velit. Accusantium consequatur enim
                    expedita ipsa, porro possimus praesentium sapiente tenetur. Alias beatae ducimus hic ipsum nulla pariatur unde! Deleniti dignissimos dolorem
                    exercitationem itaque mollitia possimus quos rerum tempora tempore vel. Aliquam aliquid assumenda blanditiis cupiditate, dolore eaque eligendi eos
                    illo in ipsum maxime molestias necessitatibus odit placeat quidem quis quo sequi! Amet corporis dolore ea est impedit inventore minima mollitia nam,
                    nemo nobis perferendis repudiandae sed ullam veniam vero. Architecto beatae commodi debitis dolores eveniet excepturi facilis, fuga ipsum nam nisi
                    numquam quibusdam quisquam quo ratione reiciendis, tempore totam. A adipisci alias aliquam animi aperiam assumenda consectetur cum dicta dolor, eos
                    esse ex explicabo fuga harum ipsam ipsum labore libero magni minima necessitatibus nemo non nulla optio perferendis perspiciatis possimus quia
                    quisquam ratione rerum sit sunt suscipit temporibus unde velit vitae voluptas voluptatibus! At culpa cum debitis doloribus eaque earum excepturi, fuga
                    illum inventore ipsum nostrum officiis rem repudiandae ullam veniam voluptates voluptatibus. Aliquam, autem consectetur dolore dolorem doloremque,
                    dolores enim error exercitationem fugiat hic impedit ipsa iste itaque iure magnam minima molestiae, nemo odit qui quidem ratione repellendus tempore
                    tenetur unde vel vitae voluptas. Ab atque consequatur dolore pariatur provident qui recusandae sed similique vel velit? A blanditiis debitis delectus
                    deleniti deserunt, dignissimos distinctio dolore, earum eligendi eveniet exercitationem illo illum impedit incidunt ipsa minima minus, nulla obcaecati
                    omnis porro quia saepe sint tempora totam veniam vero voluptates voluptatibus? A amet earum eos et excepturi exercitationem maxime necessitatibus non
                    numquam pariatur quae, quos reprehenderit sunt tenetur vel velit voluptatem. Itaque laborum, molestiae necessitatibus nemo quae repellendus
                    repudiandae tempora vero?</p>
            </Container>
        </section>
    </>;
};

export default HomepageIndex;