import { getGoogleDriveImage } from '@/libs/utils';
import type { PictureItemProps } from '@/components/common/picture/Picture';

export type GoogleDriveImageItem = Omit<PictureItemProps, 'src' | 'alt'>

export type GoogleDriveImage = {
    imageSources: string[]
    imageSizes: GoogleDriveImageItem[];
    alt: string;
}

export const createGoogleDriveImage = ({ alt, imageSizes, imageSources }: GoogleDriveImage) => {
    return imageSources.map((image: string, i: number) => ({
        src: getGoogleDriveImage(image),
        alt,
        ...imageSizes[i],
    }));
};