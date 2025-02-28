
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check for a token or session in cookies or headers
    const token = request.cookies.get('token');

    // If the token doesn't exist, redirect to the login page
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user is authenticated, allow the request to continue
    return NextResponse.next();
}

// Specify the paths for which this middleware should run
export const config = {
    matcher: ['/chat', '/chat/:path'], // Adjust this to your protected routes
};