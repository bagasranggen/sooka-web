import type { AdminDataProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';

const formHomepageHighlightData = async ({ slug, variant }: AdminDataProps) => {
    const { data: products } = await supabaseServerAction({ variant: 'fetch', relation: 'productListing' });
    const { data: highlights } = await supabaseServerAction({ variant: 'fetch', relation: 'homepageHighlight' });

    let data: any = [];
    let dataView: any = [];

    if (slug) {
        data = products?.find((datum: any) => datum.slug === slug);
    }

    if (variant !== 'edit') {
        const temp: any[] = [];

        highlights?.map((item: any) => {
            const related = products?.find((product: any) => product.id === item.product_id);

            const { id, ...restRelated } = related;

            temp.push({ ...item, ...restRelated });
        });

        data = highlights;
        dataView = temp;
    }

    return {
        order: highlights?.length,
        data,
        dataView,
        products,
    };
};

export default formHomepageHighlightData;
