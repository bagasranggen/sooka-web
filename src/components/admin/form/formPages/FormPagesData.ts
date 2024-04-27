import { AdminDataProps } from '@/libs/@types';
import FormSelectUriData from '@/components/admin/form/components/FormSelectUriData';
import { supabaseServerAction } from '@/libs/fetcher';

const formPagesData = async ({ slug, variant }: AdminDataProps) => {
    const { data: pages } = await supabaseServerAction({ variant: 'fetch', relation: 'pages' });

    let data: any = [];

    if (slug) {
        data = pages?.find((page: any) => page.slug === slug);
    }

    if (!slug) {
        data = pages;
    }

    const { urlOptions, selectedFrom } = await FormSelectUriData({ slug, uri: data?.slug, valueType: 'slug' });

    return {
        order: pages?.length,
        data,
        dataView: undefined,
        urlOptions,
        selectedFrom,
    };
};

export default formPagesData;
