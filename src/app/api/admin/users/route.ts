import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    const where: Record<string, unknown> = {};
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      include: { customerProfile: true, workerProfile: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
