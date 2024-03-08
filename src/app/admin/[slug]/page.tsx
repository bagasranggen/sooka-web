import React from 'react';

import type { DynamicPageProps } from '@/libs/@types';
import { SUPABASE_HANDLES, SUPABASE_VARIANTS } from '@/libs/handles';
import { supabaseServer, SupabaseVariantProps } from '@/libs/fetcher';

import AdminIndex from '@/components/page/admin/AdminIndex';

export type PageProps = DynamicPageProps;

export const generateStaticParams = () => {
    return Object.keys(SUPABASE_VARIANTS).map((key: string) => ({ slug: key }));
};

export const generateMetadata = ({ params }: PageProps) => {
    return {
        title: 'Admin ' + SUPABASE_HANDLES[params.slug as keyof typeof SUPABASE_HANDLES],
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const slug = params.slug as SupabaseVariantProps;

    const supabase = supabaseServer();
    const { data } = await supabase.from(slug).select();

    const tableHeader = data && data?.length > 0 ? Object.keys(data[0]).map((keys: string) => keys) : [];

    return (
        <AdminIndex
            entries={{
                slug,
                title: SUPABASE_HANDLES[slug as keyof typeof SUPABASE_HANDLES],
                table: {
                    header: tableHeader,
                    body: data,
                },
            }}
        />
    );
};

export default Page;
