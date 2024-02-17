import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { createProductListingData } from '@/libs/factory/createProductListingData';

export const GET = async (): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'productListing' });

    const products = data.map((datum: any) => createProductListingData(datum));

    return NextResponse.json({ data: products });
    
};