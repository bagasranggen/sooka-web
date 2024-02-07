import { createMockData } from '@/libs/factory';

const PRODUCT_LISTING_IMAGE_SIZE = [
    {
        media: 992,
        width: 1200,
        height: 1362,
    },
    {
        width: 600,
        height: 681,
    },
];

export const PRODUCT_LISTING = createMockData(10).map((_: any, i: number) => ({}));