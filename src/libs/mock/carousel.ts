import { faker } from '@faker-js/faker';
import { SliderImageItemProps } from "@/components/common/slider/sliderImage/SliderImage";

export const BANNER_CAROUSELS: SliderImageItemProps[] = Array(5).fill(0).map((_: any, i: number) => ({
    image: {
        src: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
        width: 1920,
        height: 1080,
        alt: '',
    },
    link: {
        href: '/'
    }
}));