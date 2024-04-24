import { supabaseServerAction } from '@/libs/fetcher';

const formHomepageHighlightData = async (slug?: string) => {
    const { data: products } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });
    const { data: highlights } = await supabaseServerAction({ variant: 'fetch', relation: 'homepageHighlight' });

    const data = products?.find((datum: any) => datum.slug === slug);

    return {
        order: highlights?.length,
        data,
        products,
    };
};

export default formHomepageHighlightData;
