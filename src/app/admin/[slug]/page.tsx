import React from 'react';

import type { DynamicPageProps } from '@/libs/@types';
import type { SupabaseVariantProps } from '@/libs/fetcher';
import { SUPABASE_HANDLES, SUPABASE_HEADER_HANDLES, SUPABASE_VARIANTS } from '@/libs/handles';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';

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

    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: slug,
    });

    return (
        <AdminIndex
            entries={{
                slug,
                title: SUPABASE_HANDLES[slug as keyof typeof SUPABASE_HANDLES],
                table: {
                    header: SUPABASE_HEADER_HANDLES[slug as keyof typeof SUPABASE_HEADER_HANDLES],
                    body: data,
                },
            }}
        />
    );
};

export default Page;
