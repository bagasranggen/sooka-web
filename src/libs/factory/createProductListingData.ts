import type { CardImageItemProps } from '@/components/common/card/cardImage/CardImage';
import { createGoogleDriveImage } from '@/libs/factory';

export type ProductListingDataProps = CardImageItemProps;

export const createProductListingData = (datum: ProductListingDataProps) => {
    const images = createGoogleDriveImage({
        imageSources: datum.images as unknown as string[],
        imageSizes: 'product-listing',
        alt: datum.name,
    });

    return {
        name: datum.name,
        category: datum.category,
        isPackage: datum?.package !== '',
        ingredients: datum?.ingredients !== '' ? datum.ingredients : datum?.package ?? '',
        images,
    };
};
