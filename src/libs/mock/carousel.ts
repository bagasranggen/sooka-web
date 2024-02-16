import { faker } from '@faker-js/faker';
import type { SliderImageItemProps } from '@/components/common/slider/sliderImage/SliderImage';
import { createMockData } from '@/libs/factory/createMockData';
import { resizeFakerImage } from '@/libs/utils/resizeFakerImage';

const BANNER_IMAGE_SIZE = [
    {
        width: 1920,
        height: 1080,
    },
    {
        width: 900,
        height: 720,
    },
];

export const BANNER_CAROUSELS: SliderImageItemProps[] = createMockData(5).map((_: any, i: number) => {
    const alt = faker.commerce.productAdjective();
    const image = faker.image.urlLoremFlickr({ category: 'food' });

    return {
        images: BANNER_IMAGE_SIZE.map((size: { width: number; height: number }) => ({
            src: resizeFakerImage(image, size.width, size.height),
            width: size.width,
            height: size.height,
            alt,
        })),
        link: {
            href: '/',
        }
    };
});