import type { AdminDataProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';

import slugify from 'react-slugify';

import FormSelectUriData from '@/components/admin/form/components/FormSelectUriData';

const formHomepageCarouselData = async ({ slug, variant }: AdminDataProps) => {
    const { data: carousels } = await supabaseServerAction({ variant: 'fetch', relation: 'homepageCarousel' });

    let data: any = [];

    if (slug) {
        data = carousels?.find((datum: any) => slugify(datum.title) === slug);
    }

    if (!slug) {
        data = carousels;
    }

    const { urlOptions, selectedFrom } = await FormSelectUriData({ slug, uri: data?.uri });

    return {
        order: carousels?.length,
        data,
        dataView: undefined,
        urlOptions,
        selectedFrom,
    };
};

export default formHomepageCarouselData;
