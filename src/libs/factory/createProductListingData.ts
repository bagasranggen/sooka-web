import type { CardImageItemProps } from '@/components/common/card/cardImage/CardImage';
import { createGoogleDriveImage } from '@/libs/factory';

export type ProductListingDataProps = CardImageItemProps;

export const createProductListingData = (datum: ProductListingDataProps) => {
    // const images = createGoogleDriveImage({
    //     imageSources: [datum.imageDesktop, datum.imageMobile],
    //     imageSizes: [JSON.parse(datum.imageDesktopSize), JSON.parse(datum.imageMobileSize)],
    //     alt: datum.name,
    // });
    const images = createGoogleDriveImage({
        imageSources: [
            'https://drive.google.com/file/d/1kKoaVP_d1HdCu_UyTufN2fO6IDKRqVus/view?usp=sharing',
            'https://drive.google.com/file/d/1kKoaVP_d1HdCu_UyTufN2fO6IDKRqVus/view?usp=sharing',
        ],
        imageSizes: [
            { width: 800, height: 908, media: 992 },
            { width: 400, height: 400 },
        ],
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
