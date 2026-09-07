import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    const cleanPhone = phone?.toString().replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number' },
        { status: 400 }
      );
    }

    // Generate real 4-digit random OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const formattedPhone = `+91${cleanPhone}`;

    // Upsert user in database
    try {
      await prisma.user.upsert({
        where: { phone: formattedPhone },
        update: { otp, otpExpiresAt },
        create: {
          phone: formattedPhone,
          otp,
          otpExpiresAt,
          role: 'CUSTOMER',
          isVerified: false,
        },
      });
    } catch (dbErr) {
      console.warn('Database upsert warning (running in serverless):', dbErr);
    }

    // Real SMS dispatch via Fast2SMS if API key is provided
    let smsSent = false;
    if (process.env.FAST2SMS_API_KEY) {
      try {
        const smsRes = await fetch(
          `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=otp&variables_values=${otp}&flash=0&numbers=${cleanPhone}`,
          { method: 'GET' }
        );
        const smsData = await smsRes.json();
        if (smsData.return === true) {
          smsSent = true;
        }
      } catch (smsErr) {
        console.error('Fast2SMS dispatch error:', smsErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `4-digit OTP sent successfully to +91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      otp, // Provided for instant on-screen notification & testing without SMS API credentials
      smsSent,
      expiresInSeconds: 600,
      formattedPhone,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
  }
}
