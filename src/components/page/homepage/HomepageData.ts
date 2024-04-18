import { supabaseServerAction } from '@/libs/fetcher';
import type { SliderImageItemProps } from '@/components/common/slider/sliderImage/SliderImage';
import type { LinkProps } from '@/libs/@types';
import { createGoogleDriveImage, createProductListingData } from '@/libs/factory';
import { CardRoundedItemProps } from '@/components/common/card/cardRounded/CardRounded';

const getHomepageCarousel = async () => {
    const { data: carouselItems } = await supabaseServerAction({
        variant: 'fetch-filter',
        relation: 'homepageCarousel',
        filter: { key: 'is_show', slug: 'TRUE' },
    });

    let carousel: SliderImageItemProps[] = [];
    if (carouselItems && carouselItems?.length > 0) {
        carouselItems?.map((item: any) => {
            let link: LinkProps | undefined = undefined;

            if (item?.slug || item?.['categories_slug']) {
                link = { href: item['categories_slug'] ?? item?.slug };
            }

            link = { ...link, openNewTab: item.target } as LinkProps;

            carousel.push({
                images: createGoogleDriveImage({
                    imageSources: item.images,
                    imageSizes: 'carousel-banner',
                    alt: item.title,
                }),
                link,
            } as SliderImageItemProps);
        });
    }

    return { data: carousel };
};

const getHomepageHighlight = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch-limit',
        relation: 'productListing',
        limit: 3,
    });

    let highlight: CardRoundedItemProps[] = [];
    if (data && data.length > 0) {
        data.map((datum: any) => {
            highlight.push(createProductListingData(datum));
        });
    }

    return { data: highlight };
};

const homepageData = async () => {
    const { data: carousel } = await getHomepageCarousel();
    const { data: highlight } = await getHomepageHighlight();

    return { carousel, highlight };
};

export default homepageData;
