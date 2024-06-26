import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';
import { ADMIN_ENTRY_DATA_HANDLES } from '@/libs/handles';

import Form from '@/components/admin/form/Form';

export type PageProps = DynamicPageProps;

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const slug = params.slug as keyof typeof ADMIN_ENTRY_DATA_HANDLES;
    const data = await ADMIN_ENTRY_DATA_HANDLES[slug]({ slug: params.detail, variant: 'edit' });

    if (!data.data) notFound();

    return (
        <Form
            variant={params.slug as any}
            type="edit"
            entries={data}
        />
    );
};

export default Page;
