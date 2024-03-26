import React, { Suspense } from 'react';

import AdminAddIndex from '@/components/page/admin/AdminAddIndex';
import { supabaseServerAction } from '@/libs/fetcher';

const getData = async () => {
    const { data: categories } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    return { categories };
};

export type PageProps = {};

const Page = async ({}: PageProps): Promise<React.ReactElement> => {
    const data = await getData();

    return (
        <Suspense>
            <AdminAddIndex state={data} />
        </Suspense>
    );
};

export default Page;
