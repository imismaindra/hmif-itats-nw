import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    message: 'Logout successful',
    clearLocalStorage: true // Instruct frontend to clear localStorage
  });

  // Clear the auth token cookie
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0
  });

  return response;
}
