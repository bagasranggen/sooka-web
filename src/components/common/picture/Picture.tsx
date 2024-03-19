import React from 'react';
import { getImageProps, ImageProps } from 'next/image';
import { createAnimation } from '@/libs/factory';
import { AnimationProps, ImageZoomAnimationProps } from '@/libs/@types';

export type PictureItemProps = {
    media?: number;
} & ImageProps;

export type PictureProps = {
    items: PictureItemProps[];
    animation?: ImageZoomAnimationProps;
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
    const props: any = {
        ...image,
        className: 'img-fluid',
    };

    return <img alt={props.alt} />;
};

const Picture = ({ items, animation }: PictureProps): React.ReactElement => {
    return (
        <picture {...(animation?.type ? createAnimation({ type: animation.type }) : {})}>
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
