import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.platformSettings.findFirst();
    if (!settings) {
      settings = await prisma.platformSettings.create({
        data: { maintenanceMode: false, autoVerifyWorkers: true, commissionPercent: 15 },
      });
    }
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    let settings = await prisma.platformSettings.findFirst();
    if (settings) {
      settings = await prisma.platformSettings.update({
        where: { id: settings.id },
        data: body,
      });
    } else {
      settings = await prisma.platformSettings.create({
        data: body,
      });
    }
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
