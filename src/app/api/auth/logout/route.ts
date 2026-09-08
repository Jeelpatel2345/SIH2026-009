import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    clearSessionCookie();
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    response.cookies.set('sahyog-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Logout route error:', error);
    return NextResponse.json({ success: false, error: 'Failed to logout' }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
