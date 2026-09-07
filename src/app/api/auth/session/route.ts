import { NextResponse } from 'next/server';
import { getSession, clearSessionCookie } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        phone: true,
        email: true,
        fullName: true,
        profilePhoto: true,
        role: true,
        language: true,
        isVerified: true,
      },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
