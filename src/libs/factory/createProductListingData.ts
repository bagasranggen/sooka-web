import slugify from 'react-slugify';
import { createGoogleDriveImage } from '@/libs/factory';
import type { CardRoundedItemProps } from '@/components/common/card/Card';

export type ProductListingDataProps = CardRoundedItemProps;

export const createProductListingData = (datum: ProductListingDataProps) => {
    const images = createGoogleDriveImage({
        imageSources: datum.images as unknown as string[],
        imageSizes: 'product-listing',
        alt: datum.name,
    });

    return {
        name: datum.name,
        href: `/${datum.category}/${slugify(datum.name)}`,
        category: datum.category,
        isPackage: datum?.package !== '',
        ingredients: datum?.ingredients !== '' ? datum.ingredients : datum?.package ?? '',
        images,
    };
};
