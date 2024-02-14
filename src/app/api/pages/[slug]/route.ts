import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { DynamicPageProps } from '@/libs/@types';

export const GET = async (request: Request, context: { params: DynamicPageProps['params'] }): Promise<NextResponse> => {
    const slug = context.params.slug;

    let data = await clientSpreadsheet({ type: 'pages' });
    if (slug) {
        data = data.find((datum: any) => datum.slug === slug);
    }

    return NextResponse.json({ data });
};