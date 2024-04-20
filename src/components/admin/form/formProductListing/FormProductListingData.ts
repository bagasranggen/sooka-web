import { supabaseServerAction } from '@/libs/fetcher';

const formProductListingData = async (slug: string) => {
    const { data: products } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });
    const { data: categories } = await supabaseServerAction({ variant: 'fetch', relation: 'categories' });

    const data = products?.find((datum: any) => datum.slug === slug);

    return {
        order: products?.length,
        data,
        categories,
    };
};

export default formProductListingData;
