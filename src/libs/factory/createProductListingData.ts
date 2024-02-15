import { CardImageItemProps } from '@/components/common/card/cardImage/CardImage';
import { createGoogleDriveImage } from '@/libs/factory/createGoogleDriveImage';

export type ProductListingDataProps = {
    imageDesktop: string;
    imageDesktopSize: string;
    imageTablet: string;
    imageTabletSize: string;
    imageMobile: string;
    imageMobileSize: string;
} & CardImageItemProps;

export const createProductListingData = (datum: ProductListingDataProps) => {
    const images = createGoogleDriveImage({
        imageSources: [ datum.imageDesktop, datum.imageTablet, datum.imageMobile ],
        imageSizes: [ JSON.parse(datum.imageDesktopSize), JSON.parse(datum.imageTabletSize), JSON.parse(datum.imageMobileSize) ],
        alt: datum.name,
    });

    return {
        name: datum.name,
        category: datum.category,
        isPackage: datum?.package !== '',
        ingredients: datum?.ingredients !== '' ? datum.ingredients : (datum?.package ?? ''),
        images,
    };
};