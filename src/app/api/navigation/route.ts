import { NextResponse } from 'next/server';
import { supabaseServerAction } from '@/libs/fetcher/supabaseServerAction';

export async function GET(request: Request) {
    const { data } = await supabaseServerAction({
        variant: 'fetch',
        relation: 'navigation',
        // filter: { key: 'is_show', slug: 'TRUE' },
    });

    const show = data?.filter((datum: any) => datum['is_show']);
    // console.log('api route navigation');

    return NextResponse.json({ data: show });
}
