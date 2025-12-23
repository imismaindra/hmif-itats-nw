import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/office/')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // No token - redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Verify token
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      // Token expired or invalid - clear cookie and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.set('auth-token', '', { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/office/:path*'],
};
