import { faker } from '@faker-js/faker';
import type { SliderImageItemProps } from '@/components/common/slider/sliderImage/SliderImage';
import { createMockData } from '@/libs/factory';

const BANNER_IMAGE_SIZE = [
    {
        width: 1200,
        height: 900,
    },
    {
        width: 2560,
        height: 1080,
    }
];

export const BANNER_CAROUSELS: SliderImageItemProps[] = createMockData(5).map((_: any, i: number) => {
    const image = faker.image.urlPicsumPhotos();

    return {
        image: BANNER_IMAGE_SIZE.map((size: { width: number; height: number }) => ({
            src: image.replace('640', size.width.toString()).replace('480', size.height.toString()),
            width: size.width,
            height: size.height,
            alt: '',
        })),
        link: {
            href: '/',
        }
    };
});