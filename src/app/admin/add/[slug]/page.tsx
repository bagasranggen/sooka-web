import React, { Suspense } from 'react';

import type { DynamicPageProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher';

import AdminAddIndex from '@/components/page/admin/AdminAddIndex';

const getData = async () => {
    const { data: categories } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    return { categories };
};

export type PageProps = DynamicPageProps;

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const data = await getData();

    console.log(params);

    return (
        <Suspense>
            <AdminAddIndex
                slug={params.slug as string}
                state={data}
            />
        </Suspense>
    );
};

export default Page;
