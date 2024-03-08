import { NextResponse } from 'next/server';
import { clientSpreadsheet } from '@/libs/fetcher';
import { createHomepageCarouselData } from '@/libs/factory';

export const GET = async (request: Request, context: { params: any }): Promise<NextResponse> => {
    const dataCarousel = await clientSpreadsheet({ type: 'homepageCarousel' });

    const carousel = dataCarousel.map((datum: any) => createHomepageCarouselData(datum));

    const data = {
        carousel,
    };

    return NextResponse.json(data);
};

export const revalidate = 60;
