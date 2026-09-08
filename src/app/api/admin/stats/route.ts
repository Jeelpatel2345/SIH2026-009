import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Live User & Worker Counts from Neon Database
    const totalUsers = await prisma.user.count();
    const verifiedWorkers = await prisma.workerProfile.count({ 
      where: { verificationStatus: 'APPROVED' } 
    });
    const pendingWorkers = await prisma.workerProfile.count({ 
      where: { verificationStatus: 'PENDING' } 
    });
    const totalWorkers = await prisma.workerProfile.count();

    // 2. Live Bookings & Active Jobs
    const activeJobs = await prisma.booking.count({ 
      where: { status: { in: ['IN_PROGRESS', 'CONFIRMED', 'ASSIGNED'] } } 
    });
    const completedJobs = await prisma.booking.count({ 
      where: { status: 'COMPLETED' } 
    });
    const totalBookings = await prisma.booking.count();

    // 3. Live Financial Calculations
    const bookingAggregate = await prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const totalVolume = bookingAggregate._sum.totalAmount || 0;
    const totalCommission = Math.round(totalVolume * 0.12); // 12% platform commission

    // 4. Live Recent Registrations
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // 5. Live Recent Bookings
    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: { fullName: true, phone: true },
        },
        workerProfile: {
          include: {
            user: { select: { fullName: true, phone: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      source: 'Neon PostgreSQL Database (Real-time)',
      stats: {
        totalUsers,
        verifiedWorkers,
        pendingWorkers,
        totalWorkers,
        activeJobs,
        completedJobs,
        totalBookings,
        totalVolume,
        totalCommission,
        reviewQueueCount: pendingWorkers,
      },
      recentUsers,
      recentBookings,
    });
  } catch (error: any) {
    console.error('Error fetching admin stats from database:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Database query error',
      stats: {
        totalUsers: 0,
        verifiedWorkers: 0,
        pendingWorkers: 0,
        totalWorkers: 0,
        activeJobs: 0,
        completedJobs: 0,
        totalBookings: 0,
        totalVolume: 0,
        totalCommission: 0,
        reviewQueueCount: 0,
      },
      recentUsers: [],
      recentBookings: [],
    });
  }
}
