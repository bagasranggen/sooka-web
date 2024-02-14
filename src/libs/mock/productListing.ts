import { createMockData } from '@/libs/factory';
import { faker } from '@faker-js/faker';
import { resizeFakerImage } from '@/libs/utils/resizeFakerImage';

export const PRODUCT_LISTING_IMAGE_SIZE = [
    {
        media: 992,
        width: 800,
        height: 908,
    },
    {
        media: 576,
        width: 600,
        height: 681,
    },
    {
        width: 400,
        height: 454,
    },
];

export const PRODUCT_LISTING = createMockData(10).map((_: any, i: number) => {
    const name = faker.commerce.product();
    const productImage = faker.image.urlPicsumPhotos();

    return {
        name,
        category: faker.commerce.productMaterial().toLowerCase(),
        isPackage: i % 2 === 0,
        ingredients: faker.commerce.productDescription(),
        images: PRODUCT_LISTING_IMAGE_SIZE.map((image: any) => ({
            src: resizeFakerImage(productImage, image.width, image.height),
            width: image.width,
            height: image.height,
            alt: name,
            ...image?.media ? { media: image.media } : {},
        }))
    };
});