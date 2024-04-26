import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';
import slugify from 'react-slugify';

const formHomepageCarouselData = async (slug?: string, variant?: 'view' | 'add' | 'edit') => {
    const { data: categories } = await supabaseServerAction({ variant: 'fetch', relation: 'categories' });
    const { data: productListing } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });
    const { data: carousels } = await supabaseServerAction({ variant: 'fetch', relation: 'homepageCarousel' });

    const urlOptions: any = {};

    urlOptions['categories'] = [{ label: '-- Select From Categories --', slug: '' }];
    categories?.map((item: any) => {
        urlOptions['categories'].push({ label: item.label, slug: `/${item.slug}` });
    });

    urlOptions['products'] = [{ label: '-- Select From Products --', slug: '' }];
    productListing?.map((item: any) => {
        urlOptions['products'].push({ label: item.name, slug: `/${item.category}/${item.slug}` });
    });

    let data: any = [];
    let selectedFrom = '';

    if (slug) {
        data = carousels?.find((datum: any) => slugify(datum.title) === slug);

        const isCategories = urlOptions?.categories?.find((item: any) => item.slug === data?.uri);
        const isProducts = urlOptions?.products?.find((item: any) => item.slug === data?.uri);
        const isCustom = data?.uri;

        if (isCategories?.slug) selectedFrom = 'categories';
        if (isProducts?.slug) selectedFrom = 'products';
        if (!isCategories?.slug && !isProducts?.slug && isCustom) selectedFrom = 'custom';
    }

    if (!slug) {
        data = carousels;
    }

    return {
        order: carousels?.length,
        data,
        dataView: undefined,
        urlOptions,
        selectedFrom,
    };
};

export default formHomepageCarouselData;
