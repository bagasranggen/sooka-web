import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';

export const GET = async (request: Request, context: { params: any }): Promise<NextResponse> => {
    const data = await clientSpreadsheet({ type: 'pages' });

    return NextResponse.json({ data });
};

export const revalidate = 60;
