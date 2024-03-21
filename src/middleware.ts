import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userString = request.cookies.get('user')?.value ?? '';
    const data = userString ? JSON?.parse(userString) : '';

    if (!data.user) {
        console.log(request.nextUrl.pathname);

        return NextResponse.redirect(new URL(`/login?to=${request.nextUrl.pathname}`, request.url));
    }
    //
    // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    //     return Response.redirect(new URL('/login', request.url))
    // }
}

export const config = {
    matcher: '/admin/:path*',
};
