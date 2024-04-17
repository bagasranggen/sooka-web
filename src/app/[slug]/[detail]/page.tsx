import React from 'react';

import slugify from 'react-slugify';

import type { DynamicPageProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher';
import ProductDetailIndex from '@/components/page/productDetail/ProductDetailIndex';

export type PageProps = DynamicPageProps;

export const generateStaticParams = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'productListing',
    });

    return (data as any[]).map((datum: any) => `/${datum.category}/${slugify(datum.name)}`);
};

const Page = ({ params }: PageProps): React.ReactElement => {
    return <ProductDetailIndex />;
};

export default Page;
