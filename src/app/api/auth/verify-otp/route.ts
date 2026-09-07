import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp, role } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    let user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
      include: { customerProfile: true, workerProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone: formattedPhone,
          role: role || 'CUSTOMER',
        },
        include: { customerProfile: true, workerProfile: true },
      });
    }

    if (otp !== '1234' && otp !== user.otp) {
      return NextResponse.json({ error: 'Invalid OTP. Demo OTP is 1234.' }, { status: 401 });
    }

    const userRole = role || user.role || 'CUSTOMER';
    await prisma.user.update({
      where: { id: user.id },
      data: { role: userRole, otp: null },
    });

    const token = await createToken({
      userId: user.id,
      role: userRole,
      phone: user.phone,
      language: user.language || 'EN',
    });

    setSessionCookie(token);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        role: userRole,
        language: user.language,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
