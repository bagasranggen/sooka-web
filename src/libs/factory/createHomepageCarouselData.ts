import { createGoogleDriveImage } from '@/libs/factory';

export const createHomepageCarouselData = (datum: any) => {
    const images = createGoogleDriveImage({
        imageSources: [datum.imageDesktop, datum.imageMobile],
        imageSizes: [JSON.parse(datum.imageDesktopSize), JSON.parse(datum.imageMobileSize)],
        alt: datum.title,
    });

    return {
        images,
        link: {
            href: datum?.href ?? '#',
        },
    };
};
