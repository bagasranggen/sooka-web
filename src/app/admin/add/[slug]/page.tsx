import React from 'react';

import type { DynamicPageProps } from '@/libs/@types';
import { ADMIN_ENTRY_DATA_HANDLES } from '@/libs/handles';

import Form from '@/components/admin/form/Form';

export type PageProps = DynamicPageProps;

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const data = await ADMIN_ENTRY_DATA_HANDLES[params.slug as keyof typeof ADMIN_ENTRY_DATA_HANDLES]('', 'add');

    return (
        <Form
            variant={params.slug as any}
            type="add"
            entries={data}
        />
    );
};

export default Page;
