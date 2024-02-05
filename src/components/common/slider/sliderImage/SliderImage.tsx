'use client';

import React from 'react';
import { SLIDER_VARIANTS } from "@/libs/handles";
import type { LinkProps } from "@/libs/@types";
import { getImageProps, ImageProps } from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getBackgroundImage } from "@/libs/utils";

export type SliderImageItemProps = {
    link: LinkProps;
    image: ImageProps;
}

export type SliderImageProps = {
    variant: typeof SLIDER_VARIANTS.IMAGE;
    items: SliderImageItemProps[]
};

const SliderImage = ({ items }: SliderImageProps): React.ReactElement => (
    <Swiper
        navigation={true}
        modules={[ Navigation ]}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }}>
        {items.map((item: SliderImageItemProps, i: number) => {
            const { props: { srcSet } } = getImageProps(item.image);
            const backgroundImage = getBackgroundImage(srcSet);

            console.log(backgroundImage);

            return <SwiperSlide
                key={i}
                style={{
                    height: '100vh',
                    backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: 'center center'
                }}>Slide {i + 1}</SwiperSlide>;
        })}
    </Swiper>
);

export default SliderImage;