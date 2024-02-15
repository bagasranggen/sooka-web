import { DynamicPageProps } from '@/libs/@types';
import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { createProductListingData } from '@/libs/factory/createProductListingData';

export const GET = async (request: Request, context: { params: DynamicPageProps['params'] }): Promise<NextResponse> => {
    const slug = context.params.slug;

    const data = await clientSpreadsheet({ type: 'productListing' });
    const allProducts = data.map((datum: any) => createProductListingData(datum));
    const products = allProducts.filter((datum: any) => datum.category === slug);

    return NextResponse.json({ data: products });
};