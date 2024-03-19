import { getGoogleDriveImage } from '@/libs/utils';
import { IMAGE_SIZE_VARIANTS, IMAGES_SIZE_HANDLES } from '@/libs/handles/imageSize';

export type GoogleDriveImage = {
    imageSources: string[];
    imageSizes: (typeof IMAGE_SIZE_VARIANTS)[keyof typeof IMAGE_SIZE_VARIANTS];
    alt: string;
};

export const createGoogleDriveImage = ({ alt, imageSizes, imageSources }: GoogleDriveImage) => {
    const sizes = IMAGES_SIZE_HANDLES[imageSizes];

    return imageSources.map((image: string, i: number) => ({
        src: getGoogleDriveImage(image),
        alt,
        ...sizes[i],
    }));
};
