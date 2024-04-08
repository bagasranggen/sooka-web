import type { LinkProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher';
import { createGoogleDriveImage } from '@/libs/factory';

import type { SliderImageItemProps } from '@/components/common/slider/Slider';
import HomepageIndex from '@/components/page/homepage/HomepageIndex';

const getHomepageData = async () => {
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

    return { carousel };
};

const Home = async () => {
    const { carousel } = await getHomepageData();

    return <HomepageIndex entries={{ carousel }} />;
};

export default Home;
