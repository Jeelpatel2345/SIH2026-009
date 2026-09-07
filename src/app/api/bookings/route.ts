import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateBookingCode } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const workerProfileId = searchParams.get('workerProfileId');

    const where: Record<string, unknown> = {};
    if (customerId) where.customerId = customerId;
    if (workerProfileId) where.workerProfileId = workerProfileId;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        workerProfile: { include: { user: true } },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booking = await prisma.booking.create({
      data: {
        bookingCode: generateBookingCode(),
        customerId: body.customerId,
        workerProfileId: body.workerProfileId,
        serviceTitle: body.serviceTitle,
        scheduledDate: new Date(body.scheduledDate || Date.now()),
        scheduledTime: body.scheduledTime || '10:00 AM',
        serviceLocation: body.serviceLocation || 'Gurgaon, Haryana',
        totalAmount: body.totalAmount || 625,
        serviceFee: body.serviceFee || 450,
        materialFee: body.materialFee || 150,
        platformFee: body.platformFee || 25,
        paymentMethod: body.paymentMethod || 'UPI',
        workerOtp: '5821',
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
