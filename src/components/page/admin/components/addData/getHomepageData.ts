import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';

export const getHomepageData = async () => {
    const { data: categories } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    const { data: carousels } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'homepageCarousel',
    });

    return {
        categories,
        carousels,
    };
};
