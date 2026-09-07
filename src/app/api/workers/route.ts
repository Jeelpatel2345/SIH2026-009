import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (category) {
      where.serviceCategories = {
        some: {
          serviceCategory: { name: { contains: category } },
        },
      };
    }

    if (search) {
      where.OR = [
        { user: { fullName: { contains: search } } },
        { bio: { contains: search } },
        { primaryWorkArea: { contains: search } },
      ];
    }

    const workers = await prisma.workerProfile.findMany({
      where,
      include: {
        user: true,
        skills: true,
        serviceCategories: { include: { serviceCategory: true } },
      },
      orderBy: { rating: 'desc' },
    });

    return NextResponse.json({ workers });
  } catch (error) {
    console.error('Workers error:', error);
    return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
  }
}
