import { createGoogleDriveImage } from '@/libs/factory';
import { convertNumberToCurrency } from '@/libs/utils';

import type { CardRoundedItemProps } from '@/components/common/card/Card';

export type ProductListingDataProps = CardRoundedItemProps;

export const createProductListingData = (datum: any) => {
    const images = createGoogleDriveImage({
        imageSources: datum.images as unknown as string[],
        imageSizes: 'product-listing',
        alt: datum.name,
    });

    const slides = [images, images, images];

    return {
        name: datum.name,
        description: datum.description,
        href: `/${datum.category}/${datum.slug}`,
        category: datum.category,
        isPackage: datum?.package !== '',
        ingredients: datum?.ingredients !== '' ? datum.ingredients : datum?.package ?? '',
        images,
        slides,
        price: convertNumberToCurrency({ price: datum.price }),
        isSold: datum['is_sold'],
    };
};
