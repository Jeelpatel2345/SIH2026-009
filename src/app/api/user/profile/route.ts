import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET current logged-in user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { customerProfile: true, workerProfile: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        customerProfile: user.customerProfile,
        workerProfile: user.workerProfile,
      },
    });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// UPDATE user profile in Neon DB
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { fullName, email, address, city, state, pincode, phone } = body;

    const userPhone = session?.phone || phone;
    if (!userPhone) {
      return NextResponse.json({ error: 'User phone is required' }, { status: 400 });
    }

    const formattedPhone = userPhone.startsWith('+91') ? userPhone : `+91${userPhone.replace(/\D/g, '').slice(-10)}`;

    const updatedUser = await prisma.user.upsert({
      where: { phone: formattedPhone },
      update: {
        fullName: fullName || undefined,
        email: email || undefined,
        customerProfile: {
          upsert: {
            create: { address, city, state, pincode },
            update: { address, city, state, pincode },
          },
        },
      },
      create: {
        phone: formattedPhone,
        fullName: fullName || 'Verified User',
        email,
        role: 'CUSTOMER',
        isVerified: true,
        customerProfile: {
          create: { address, city, state, pincode },
        },
      },
      include: { customerProfile: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully in database',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
