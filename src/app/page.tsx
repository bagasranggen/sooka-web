import { supabaseServerAction } from '@/libs/fetcher';
import { createGoogleDriveImage } from '@/libs/factory';

import type { SliderImageItemProps } from '@/components/common/slider/sliderImage/SliderImage';
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
            carousel.push({
                images: createGoogleDriveImage({
                    imageSources: item.images,
                    imageSizes: 'carousel-banner',
                    alt: item.title,
                }),
                link: item?.href ? { href: item.href } : undefined,
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
