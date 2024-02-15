import { faker } from '@faker-js/faker';
import { createMockData } from '@/libs/factory/createMockData';

export const PRODUCT_CATEGORY = createMockData(5).map((_: any, i: number) => {
    const category = faker.commerce.productMaterial();

    return {
        label: category,
        slug: category.toLowerCase(),
    };
});