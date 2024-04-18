import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';

import ProductListingIndex from '@/components/page/productListing/ProductListingIndex';
import ProductListingData from '@/components/page/productListing/ProductListingData';

export type PageProps = DynamicPageProps;

export const generateStaticParams = async () => {
    const { path } = await ProductListingData();

    return path;
};

export const generateMetadata = async ({ params }: PageProps) => {
    const { page } = await ProductListingData(params.slug as string);

    if (!page?.title) return notFound();

    return {
        title: page.title,
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const { page, products } = await ProductListingData(params.slug as string);

    return (
        <ProductListingIndex
            page={page}
            entries={{ products: products ?? [], categories: [] }}
        />
    );
};

export default Page;

export const revalidate = 60;
