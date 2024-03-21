import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // const currentUser = request.cookies.get('currentUser')?.value;
    // console.log('middleware', request);
    // return NextResponse.redirect(new URL('/', request.url));
    // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return Response.redirect(new URL('/dashboard', request.url))
    // }
    //
    // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    //     return Response.redirect(new URL('/login', request.url))
    // }
}

export const config = {
    matcher: '/admin/:path*',
};
