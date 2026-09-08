import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { bookingCode: { contains: search, mode: 'insensitive' } },
        { serviceTitle: { contains: search, mode: 'insensitive' } },
        { serviceLocation: { contains: search, mode: 'insensitive' } },
        { customer: { fullName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: {
          select: { id: true, fullName: true, phone: true, email: true },
        },
        workerProfile: {
          include: {
            user: { select: { id: true, fullName: true, phone: true } },
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const counts = {
      total: await prisma.booking.count(),
      active: await prisma.booking.count({ where: { status: { in: ['IN_PROGRESS', 'CONFIRMED', 'ASSIGNED'] } } }),
      completed: await prisma.booking.count({ where: { status: 'COMPLETED' } }),
      pending: await prisma.booking.count({ where: { status: 'PENDING' } }),
    };

    return NextResponse.json({
      success: true,
      bookings,
      counts,
    });
  } catch (error: any) {
    console.error('Error fetching admin bookings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'bookingId and status are required' },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error: any) {
    console.error('Error updating booking status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update booking' },
      { status: 500 }
    );
  }
}
