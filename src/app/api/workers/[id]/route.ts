import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worker = await prisma.workerProfile.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        skills: true,
        serviceCategories: { include: { serviceCategory: true } },
        reviews: { include: { customer: true }, take: 10 },
      },
    });

    if (!worker) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }

    return NextResponse.json({ worker });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch worker' }, { status: 500 });
  }
}
