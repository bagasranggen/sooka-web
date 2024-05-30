import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userString = request.cookies.get('user')?.value ?? '';
    const data = userString ? JSON?.parse(userString) : '';

    if (!data.user) {
        return NextResponse.redirect(new URL(`/login?to=${encodeURI(request.nextUrl.pathname)}`, request.url));
    } else {
        if (request.nextUrl.pathname === '/admin') {
            return NextResponse.redirect(new URL(`/admin/navigation`, request.url));
        }
    }
    //
    // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    //     return Response.redirect(new URL('/login', request.url))
    // }
}

export const config = {
    matcher: '/admin/:path*',
};
