import { faker } from '@faker-js/faker';
import type { SliderImageItemProps } from '@/components/common/slider/sliderImage/SliderImage';
import { createMockData } from '@/libs/factory';
import { resizeFakerImage } from '@/libs/utils/resizeFakerImage';

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
    const alt = faker.commerce.productAdjective();
    const image = faker.image.urlLoremFlickr({ category: 'food' });

    return {
        image: BANNER_IMAGE_SIZE.map((size: { width: number; height: number }) => ({
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