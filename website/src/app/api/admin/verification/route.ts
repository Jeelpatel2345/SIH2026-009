import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'PENDING';

    const workers = await prisma.workerProfile.findMany({
      where: { verificationStatus: status },
      include: { user: true, documents: true },
    });

    const pendingCount = await prisma.workerProfile.count({ where: { verificationStatus: 'PENDING' } });
    const approvedCount = await prisma.workerProfile.count({ where: { verificationStatus: 'APPROVED' } });

    return NextResponse.json({
      workers,
      counts: { pending: pendingCount, approved: approvedCount },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch verification list' }, { status: 500 });
  }
}
