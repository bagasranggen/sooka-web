import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { createProductListingData } from '@/libs/factory/createProductListingData';

export const GET = async (): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'productListing' });

    // const products = data.map((datum: any) => {
    //     const productImage = faker.image.urlPicsumPhotos();
    //
    //     console.log(datum.name, datum.ingredients, datum.package);
    //
    //     // console.log(datum.name, imagesArr.length);
    //
    //     return {
    //         name: datum.name,
    //         category: datum.category,
    //         isPackage: datum?.package !== '',
    //         ingredients: datum?.ingredients !== '' ? datum.ingredients : (datum?.package ?? ''),
    //         // images: imagesArr.length > 0 ? imagesArr.map((image: any, i: number) => ({
    //         //     src: getGoogleDriveImage(image),
    //         //     width: 736,
    //         //     height: 656,
    //         //     alt: datum.name,
    //         //     ...i === 0 ? { media: 992 } : {}
    //         // })) : [
    //         //     {
    //         //         src: resizeFakerImage(productImage, 736, 656),
    //         //         width: 736,
    //         //         height: 656,
    //         //         alt: datum.name
    //         //     }
    //         // ]
    //         images: PRODUCT_LISTING_IMAGE_SIZE.map((image: any) => ({
    //             src: resizeFakerImage(productImage, image.width, image.height),
    //             width: image.width,
    //             height: image.height,
    //             alt: datum.name,
    //             ...image?.media ? { media: image.media } : {},
    //         }))
    //     };
    // });

    const products = data.map((datum: any) => createProductListingData(datum));

    return NextResponse.json({ data: products });
};