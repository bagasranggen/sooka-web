import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { faker } from '@faker-js/faker';
import { getGoogleDriveImage, resizeFakerImage } from '@/libs/utils';
import { PRODUCT_LISTING_IMAGE_SIZE } from '@/libs/mock';
import { CardImageItemProps } from '@/components/common/card/cardImage/CardImage';

export const GET = async (): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'productListing' });

    const products = data.map((datum: any) => {
        const productImage = faker.image.urlPicsumPhotos();
        // const imagesArr: string[] = datum?.image.split(',\n');

        console.log(datum.name, datum.ingredients, datum.package);

        // console.log(datum.name, imagesArr.length);

        return {
            name: datum.name,
            category: datum.category,
            isPackage: datum?.package !== '',
            ingredients: datum?.ingredients !== '' ? datum.ingredients : (datum?.package ?? ''),
            // images: imagesArr.length > 0 ? imagesArr.map((image: any, i: number) => ({
            //     src: getGoogleDriveImage(image),
            //     width: 736,
            //     height: 656,
            //     alt: datum.name,
            //     ...i === 0 ? { media: 992 } : {}
            // })) : [
            //     {
            //         src: resizeFakerImage(productImage, 736, 656),
            //         width: 736,
            //         height: 656,
            //         alt: datum.name
            //     }
            // ]
            images: PRODUCT_LISTING_IMAGE_SIZE.map((image: any) => ({
                src: resizeFakerImage(productImage, image.width, image.height),
                width: image.width,
                height: image.height,
                alt: datum.name,
                ...image?.media ? { media: image.media } : {},
            }))
        };
    });

    return NextResponse.json({ data: products });
};