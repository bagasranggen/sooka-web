import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';

export const GET = async (): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'navigation' });

    return NextResponse.json({ data });
};