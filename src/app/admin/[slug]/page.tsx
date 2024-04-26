import React from 'react';

import type { DynamicPageProps } from '@/libs/@types';
import type { SupabaseVariantProps } from '@/libs/fetcher';
import type { SupabaseHeaderProps } from '@/libs/data';
import { ADMIN_ENTRY_DATA_HANDLES, SUPABASE_HANDLES, SUPABASE_HEADER_HANDLES, SUPABASE_VARIANTS } from '@/libs/handles';

import AdminIndex from '@/components/page/admin/AdminIndex';

export type PageProps = DynamicPageProps;

export const generateStaticParams = () => {
    return Object.keys(SUPABASE_VARIANTS).map((key: string) => ({
        slug: SUPABASE_VARIANTS[key as keyof typeof SUPABASE_VARIANTS],
    }));
};

export const generateMetadata = ({ params }: PageProps) => {
    return {
        title: 'Admin ' + SUPABASE_HANDLES[params.slug as keyof typeof SUPABASE_HANDLES],
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const slug = params.slug as SupabaseVariantProps;
    const data = await ADMIN_ENTRY_DATA_HANDLES[slug as keyof typeof ADMIN_ENTRY_DATA_HANDLES]('', 'view');
    const header = SUPABASE_HEADER_HANDLES[slug].filter((header: SupabaseHeaderProps) => !header?.isDetail);

    console.log(data);

    return (
        <AdminIndex
            entries={{
                slug,
                data: data.data,
                title: SUPABASE_HANDLES[slug as keyof typeof SUPABASE_HANDLES],
                table: {
                    head: header,
                    body: data?.dataView ?? data.data,
                    link: {
                        page: slug,
                    },
                },
            }}
        />
    );
};

export default Page;

export const revalidate = 0;
