import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';
import { createProductListingData, type ProductListingDataProps } from '@/libs/factory';

import type { FilterProductItemProps } from '@/components/common/filter/filterProduct/FilterProduct';
import ProductListingIndex, {
    type ProductListingIndexProps,
} from '@/components/page/productListing/ProductListingIndex';

export type PageProps = DynamicPageProps;

const getPage = async (slug: string): Promise<{ data: ProductListingIndexProps['page'] }> => {
    const { data } = await supabaseServerAction({
        variant: 'fetch-find',
        relation: 'pages',
        slug,
    });

    return { data: data ? data[0] : {} };
};

const getProductListing = async (slug: string) => {
    const { data } = await supabaseServerAction({
        variant: 'fetch-filter',
        relation: 'productListing',
        filter: {
            key: 'category',
            slug,
        },
    });

    let productListing: ProductListingDataProps[] = [];
    if (data && data?.length > 0) {
        data.map((datum: ProductListingDataProps) => {
            productListing.push(createProductListingData(datum));
        });
    }

    return { data: productListing };
};

export const generateStaticParams = async () => {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'categories',
    });

    return (data as any[]).map((datum: FilterProductItemProps) => datum.slug);
};

export const generateMetadata = async ({ params }: PageProps) => {
    const { data: page } = await getPage(params.slug as string);

    if (!page) return notFound();

    return {
        title: page.title,
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const { data: page } = await getPage(params.slug as string);
    const { data: products } = await getProductListing(params.slug as string);

    return (
        <ProductListingIndex
            page={page}
            entries={{ products: products, categories: [] }}
        />
    );
};

export default Page;

export const revalidate = 60;
