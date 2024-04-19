'use client';

import React from 'react';

import { SLIDER_VARIANTS } from '@/libs/handles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useMedia } from 'react-use';

import Picture, { PictureItemProps } from '@/components/common/picture/Picture';
import SliderWrapper from '@/components/common/slider/sliderWrapper/SliderWrapper';

export type SliderVerticalItemProps = PictureItemProps[];

export type SliderVerticalProps = {
    variant: typeof SLIDER_VARIANTS.VERTICAL;
    items: SliderVerticalItemProps[];
};

export const SliderVerticalDesktop = ({ items }: Pick<SliderVerticalProps, 'items'>): React.ReactElement => {
    return (
        <>
            {items.map((item: any, i: number) => (
                <Picture
                    key={i}
                    className="d-none d-lg-block"
                    items={item}
                />
            ))}
        </>
    );
};

export const SliderVerticalMobile = ({ items }: Pick<SliderVerticalProps, 'items'>): React.ReactElement => {
    return (
        <SliderWrapper
            className="d-lg-none"
            option={{ nested: true }}>
            <Swiper
                className="slider-vertical"
                slidesPerView={1.05}
                spaceBetween={15}>
                {items.map((item: SliderVerticalItemProps, i: number) => (
                    <SwiperSlide key={i}>
                        <Picture items={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </SliderWrapper>
    );
};

const SliderVertical = ({ items }: SliderVerticalProps): React.ReactElement => {
    const isDesktop = useMedia('(min-width: 992px)', true);

    return isDesktop ? <SliderVerticalDesktop items={items} /> : <SliderVerticalMobile items={items} />;
};

export default SliderVertical;
