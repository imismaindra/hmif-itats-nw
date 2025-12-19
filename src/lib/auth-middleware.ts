import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const user = verifyToken(token);

  if (!user) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('auth-token', '', { maxAge: 0 });
    return response;
  }

  return NextResponse.next();
}

export function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
