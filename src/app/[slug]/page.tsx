import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';
import { axiosClient } from '@/libs/fetcher';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';
import { GOOGLE_SPREADSHEET_VARIANT } from '@/libs/handles';

import type { FilterProductItemProps } from '@/components/common/filter/filterProduct/FilterProduct';
import ProductListingIndex from '@/components/page/productListing/ProductListingIndex';

export type PageProps = DynamicPageProps;

export const generateStaticParams = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    // const { data } = await axiosClient().get(GOOGLE_SPREADSHEET_VARIANT.CATEGORIES);

    return (data as any[]).map((datum: FilterProductItemProps) => datum.slug);
};

export const generateMetadata = async ({ params }: PageProps) => {
    // const { data: page } = await axiosClient().get(`${GOOGLE_SPREADSHEET_VARIANT.PAGES}/${params.slug}`);
    const { data: page } = await supabaseServerAction({
        variant: 'fetch-find',
        relation: 'pages',
        slug: params.slug as string,
    });

    console.log(page);

    // const select = page?.find((f: any) => f.slug === params.slug);

    if (!page) return notFound();

    return {
        title: page[0].title,
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
