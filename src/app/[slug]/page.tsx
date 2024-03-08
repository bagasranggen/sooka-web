import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';
import { axiosClient } from '@/libs/fetcher';
import { GOOGLE_SPREADSHEET_VARIANT } from '@/libs/handles';

import type { FilterProductItemProps } from '@/components/common/filter/filterProduct/FilterProduct';
import ProductListingIndex from '@/components/page/productListing/ProductListingIndex';

export type PageProps = DynamicPageProps;

export const generateStaticParams = async () => {
    const { data } = await axiosClient().get(GOOGLE_SPREADSHEET_VARIANT.CATEGORIES);

    return data.map((datum: FilterProductItemProps) => datum.slug);
};

export const generateMetadata = async ({ params }: PageProps) => {
    const { data: page } = await axiosClient().get(`${GOOGLE_SPREADSHEET_VARIANT.PAGES}/${params.slug}`);

    if (!page) return notFound();

    return {
        title: page.title,
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const { data: page } = await axiosClient().get(`${GOOGLE_SPREADSHEET_VARIANT.PAGES}/${params.slug}`);
    // const { data: { data: categories } } = await axiosClient().get(GOOGLE_SPREADSHEET_VARIANT.CATEGORIES);
    const { data: products } = await axiosClient().get(`${GOOGLE_SPREADSHEET_VARIANT.PRODUCT_LISTING}/${params.slug}`);

    return (
        <ProductListingIndex
            page={page}
            entries={{ products: products, categories: [] }}
        />
    );
};

export default Page;

export const revalidate = 60;
