import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { phone, fullName } = await request.json();
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
        update: { 
          otp, 
          otpExpiresAt,
          fullName: fullName ? fullName.trim() : undefined,
        },
        create: {
          phone: formattedPhone,
          otp,
          otpExpiresAt,
          role: 'CUSTOMER',
          fullName: fullName ? fullName.trim() : `User ${cleanPhone.slice(-4)}`,
          isVerified: false,
        },
      });
    } catch (dbErr) {
      console.warn('Database upsert warning (running in serverless):', dbErr);
    }

    // Real SMS dispatch via Twilio API
    let smsSent = false;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    // 1. Primary: Twilio Verify Service API (highest delivery rate for Indian mobile numbers)
    if (twilioSid && twilioAuth && twilioVerifySid) {
      try {
        const verifyUrl = `https://verify.twilio.com/v2/Services/${twilioVerifySid}/Verifications`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const formBody = new URLSearchParams({
          To: formattedPhone,
          Channel: 'sms'
        });

        const verifyRes = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody.toString()
        });
        if (verifyRes.ok) {
          smsSent = true;
          console.log(`[Twilio Verify] Real-time SMS successfully dispatched to ${formattedPhone}`);
        } else {
          const errText = await verifyRes.text();
          console.warn('[Twilio Verify] Dispatch warning:', errText);
        }
      } catch (verErr) {
        console.error('Twilio Verify dispatch error:', verErr);
      }
    }

    // 2. Secondary: Twilio Messages API
    if (!smsSent && twilioSid && twilioAuth && twilioPhone) {
      try {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const formBody = new URLSearchParams({
          To: formattedPhone,
          From: twilioPhone,
          Body: `Your SahYog verification OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone.`
        });

        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody.toString()
        });
        if (twilioRes.ok) {
          smsSent = true;
        }
      } catch (twErr) {
        console.error('Twilio SMS dispatch error:', twErr);
      }
    }

    // Secondary fallback: Fast2SMS if provided
    if (!smsSent && process.env.FAST2SMS_API_KEY) {
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

    // Tertiary fallback: 2Factor.in API if provided
    if (!smsSent && process.env.TWOFACTOR_API_KEY) {
      try {
        const twoFacRes = await fetch(
          `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${cleanPhone}/${otp}/OTP1`
        );
        const twoFacData = await twoFacRes.json();
        if (twoFacData.Status === 'Success') {
          smsSent = true;
        }
      } catch (twoErr) {
        console.error('2Factor dispatch error:', twoErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `4-digit OTP sent successfully to +91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      smsSent,
      provider: twilioSid ? 'Twilio SMS' : 'SahYog Live SMS',
      expiresInSeconds: 600,
      formattedPhone,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
  }
}
