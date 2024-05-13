import { createGoogleDriveImage } from '@/libs/factory';
import { convertNumberToCurrency } from '@/libs/utils';

import type { CardRoundedItemProps } from '@/components/common/card/Card';

export type ProductListingDataProps = CardRoundedItemProps;

export const createProductListingData = (datum: any) => {
    const images = createGoogleDriveImage({
        imageSources: datum.images as unknown as string[],
        imageSizes: 'product-listing',
        alt: datum.name,
    });

    let imageGallery: any[] = [];
    if (datum?.gallery && datum.gallery.length > 0) {
        const gallery = datum.gallery;

        Array(gallery.length / 2)
            .fill(0)
            .map((item: any, i: number) => {
                let index = 0;
                if (i > 0) index = i + 1;

                imageGallery.push(
                    createGoogleDriveImage({
                        imageSources: [gallery[index], gallery[index + 1]],
                        imageSizes: 'product-listing',
                        alt: datum.name,
                    })
                );
            });
    }

    const slides = [images, ...imageGallery];

    return {
        name: datum.name,
        description: datum.description,
        href: `/${datum.category}/${datum.slug}`,
        category: datum.category,
        isPackage: datum?.package !== '',
        ingredients: datum?.ingredients !== '' ? datum.ingredients : datum?.package ?? '',
        images,
        slides,
        price: convertNumberToCurrency({ price: datum.price }),
        isSold: datum['is_sold'],
        details: {
            dimension: datum.dimension,
            flavours: [
                {
                    start: 'Fresh',
                    end: 'Creamy',
                    value: datum.flavour_1,
                },
                {
                    start: 'Custardy',
                    end: 'Spongy',
                    value: datum.flavour_2,
                },
                {
                    start: 'Tangy',
                    end: 'Sweet',
                    value: datum.flavour_3,
                },
            ],
        },
    };
};
