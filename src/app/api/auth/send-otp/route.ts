import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOTP } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    if (!phone || phone.length !== 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.upsert({
      where: { phone: `+91${phone}` },
      update: { otp, otpExpiresAt },
      create: { phone: `+91${phone}`, otp, otpExpiresAt },
    });

    return NextResponse.json({ success: true, message: 'OTP sent successfully. Demo OTP: 1234' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
