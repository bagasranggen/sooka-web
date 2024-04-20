import React from 'react';
import { notFound } from 'next/navigation';

import { DynamicPageProps } from '@/libs/@types';

import Form from '@/components/admin/form/Form';
import FormProductListingData from '@/components/admin/form/formProductListing/FormProductListingData';

export type PageProps = DynamicPageProps;

const Page = async ({ params, searchParams }: PageProps): Promise<React.ReactElement> => {
    const data = await FormProductListingData(searchParams?.slug as string);

    if (!data.data) notFound();

    return (
        <Form
            variant={params.slug as any}
            entries={data}
        />
    );
};

export default Page;
