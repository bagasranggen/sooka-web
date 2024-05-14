import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');
    const type = searchParams?.get('type') ?? 'page';

    if (path) {
        revalidatePath(path, type as any);
        return Response.json({ revalidated: true, now: Date.now() });
    }

    return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate',
        variant: {
            type,
        },
    });
}
