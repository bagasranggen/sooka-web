import type { AdminDataProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher';

import FormSelectUriData from '@/components/admin/form/components/FormSelectUriData';

const FormNavigationData = async ({ slug, variant }: AdminDataProps) => {
    const { data: navigations } = await supabaseServerAction({ variant: 'fetch', relation: 'navigation' });

    let data: any = [];

    if (slug) {
        data = navigations?.find((item: any) => item.slug === slug);
    }

    if (!slug) {
        data = navigations;
    }

    const { urlOptions, selectedFrom } = await FormSelectUriData({ slug, uri: data?.uri });

    return {
        order: navigations?.length,
        data,
        dataView: undefined,
        urlOptions,
        selectedFrom,
    };
};

export default FormNavigationData;
