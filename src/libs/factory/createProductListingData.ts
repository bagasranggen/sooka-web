import type { CardImageItemProps } from '@/components/common/card/cardImage/CardImage';
import { createGoogleDriveImage } from '@/libs/factory';

export type ProductListingDataProps = Record<
    'imageDesktop' | 'imageDesktopSize' | 'imageMobile' | 'imageMobileSize',
    string
> &
    CardImageItemProps;

export const createProductListingData = (datum: ProductListingDataProps) => {
    const images = createGoogleDriveImage({
        imageSources: [datum.imageDesktop, datum.imageMobile],
        imageSizes: [JSON.parse(datum.imageDesktopSize), JSON.parse(datum.imageMobileSize)],
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
