import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const worker = await prisma.workerProfile.update({
      where: { id: params.id },
      data: {
        verificationStatus: body.status,
        isDocVerified: body.status === 'APPROVED',
      },
    });
    return NextResponse.json({ worker });
  } catch {
    return NextResponse.json({ error: 'Failed to update verification status' }, { status: 500 });
  }
}
