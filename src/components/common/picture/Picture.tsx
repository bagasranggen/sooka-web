import React from 'react';
import { getImageProps, ImageProps } from 'next/image';

export type PictureItemProps = {
    // image: ImageProps
    isImage: boolean;
    media?: number;
} & ImageProps;

export type PictureProps = {
    items: PictureItemProps[];
};

const PictureItem = (item: PictureItemProps): React.ReactElement => {
    const Image: keyof React.JSX.IntrinsicElements = item.isImage ? 'img' : 'source';

    const { props: image } = getImageProps(item);
    const { isImage, style, ...rest } = image;
    let props = {};

    if (item.isImage) {
        props = {
            className: 'img-fluid'
        };
    } else {
        props = {
            media: '(min-width: 768px)'
        };
    }

    return <Image {...rest} {...props} />;
};

const Picture = ({ items }: PictureProps): React.ReactElement => {
    return <picture>
        {items.map((item: PictureItemProps, i: number) => <PictureItem
            key={i}
            isImage={items.length - 1 === i}
            {...item} />)}
    </picture>;
};

export default Picture;