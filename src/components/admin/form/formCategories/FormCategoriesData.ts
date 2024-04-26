import { supabaseServerAction } from '@/libs/fetcher';

const formCategoriesData = async (slug?: string, variant?: 'view' | 'add' | 'edit') => {
    const { data: categories } = await supabaseServerAction({ variant: 'fetch', relation: 'categories' });

    let data: any = [];

    if (slug) {
        data = categories?.find((item: any) => item.slug === slug);
    }

    if (!slug) {
        data = categories;
    }

    return {
        order: categories?.length,
        data,
        dataView: undefined,
    };
};

export default formCategoriesData;
