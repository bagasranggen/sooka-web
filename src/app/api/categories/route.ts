import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';

export const GET = async (): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'categories' });

    return NextResponse.json({ data });
};

export const revalidate = 60;
