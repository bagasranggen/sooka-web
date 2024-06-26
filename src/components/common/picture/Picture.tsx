import React from 'react';
import { getImageProps, ImageProps } from 'next/image';

import type { ImageParallaxAnimationProps, ImageZoomAnimationProps } from '@/libs/@types';
import { createAnimation } from '@/libs/factory';

export type PictureItemProps = {
    media?: number;
} & ImageProps;

export type PictureProps = {
    className?: string;
    items: PictureItemProps[];
    animation?: ImageZoomAnimationProps | ImageParallaxAnimationProps;
};

const PictureItemSource = (item: PictureItemProps): React.ReactElement => {
    const { props: image } = getImageProps(item);

    const props = {
        ...image,
        ...(item?.media ? { media: `(min-width: ${item.media}px)` } : {}),
    };

    // eslint-disable-next-line jsx-a11y/alt-text
    return <source {...(props as any)} />;
};

const PictureItemImg = (item: PictureItemProps): React.ReactElement => {
    const { props: image } = getImageProps(item);
    const { blurWidth, blurHeight, ...restImage } = image as unknown as any;

    const props: any = {
        ...restImage,
        className: 'img-fluid',
    };

    return (
        <img
            {...props}
            alt={props.alt}
        />
    );
};

const Picture = ({ className, items, animation }: PictureProps): React.ReactElement => {
    const pictureClass = className ?? '';

    return (
        <picture
            {...(className ? { className: pictureClass } : {})}
            {...(animation?.type ? createAnimation({ type: animation.type }) : {})}>
            {items.map((item: PictureItemProps, i: number) => {
                const Image = items.length - 1 === i ? PictureItemImg : PictureItemSource;

                return (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <Image
                        key={i}
                        {...item}
                    />
                );
            })}
        </picture>
    );
};

export default Picture;
