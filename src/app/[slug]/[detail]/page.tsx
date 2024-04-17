import React from 'react';
import { notFound } from 'next/navigation';

import type { DynamicPageProps } from '@/libs/@types';

import ProductDetailIndex from '@/components/page/productDetail/ProductDetailIndex';
import ProductDetailData from '@/components/page/productDetail/ProductDetailData';

export type PageProps = DynamicPageProps;

export const generateStaticParams = async ({ params }: PageProps) => {
    const { path } = await ProductDetailData(params.detail as string);

    return path;
};

export const generateMetadata = async ({ params }: PageProps) => {
    const { page } = await ProductDetailData(params.detail as string);

    if (!page?.title) return notFound();

    return {
        title: page.title,
    };
};

const Page = async ({ params }: PageProps): Promise<React.ReactElement> => {
    const { entries } = await ProductDetailData(params.detail as string);

    return <ProductDetailIndex {...entries} />;
};

export default Page;
