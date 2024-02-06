'use client';

import React from 'react';
import Link from 'next/link';

import { SLIDER_VARIANTS } from '@/libs/handles';
import type { LinkProps } from '@/libs/@types';
import { getBackgroundImage } from '@/libs/utils';
import { getImageProps, ImageProps } from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export type SliderImageItemProps = {
    link: LinkProps;
    image: ImageProps[];
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
        }}
        speed={900}
        className="slider-image">
        {items.map((item: SliderImageItemProps, i: number) => {
            const ConditionalLink: any = item?.link?.href ? Link : React.Fragment;
            const conditionProps = item?.link?.href ? {
                ...item?.link,
                className: 'slider-image__item',
            } : {};

            const { props: { srcSet: srcMobile } } = getImageProps(item.image[0]);
            const { props: { srcSet: srcDesktop } } = getImageProps(item.image[1]);
            const backgroundImageMobile = getBackgroundImage(srcMobile);
            const backgroundImageDesktop = getBackgroundImage(srcDesktop);
            const style = {
                '--background-sm': backgroundImageMobile,
                '--background-lg': backgroundImageDesktop,
            } as React.CSSProperties;

            return <SwiperSlide
                key={i}
                className="oly--20"
                style={style}>
                <ConditionalLink {...conditionProps} />
            </SwiperSlide>;
        })}
    </Swiper>
);

export default SliderImage;