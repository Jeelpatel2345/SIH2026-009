import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { phone, fullName } = await request.json();
    const rawDigits = phone?.toString().replace(/\D/g, '') || '';
    const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;

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

    // Save OTP to database (this is the source of truth for verification)
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
      console.warn('Database upsert warning:', dbErr);
    }

    let smsSent = false;
    let smsProvider = 'none';

    // ─────────────────────────────────────────────────────
    // PROVIDER 1: Fast2SMS (PRIMARY — works on ANY Indian number, free)
    // Sign up at https://fast2sms.com → Dev API → copy API key
    // Add FAST2SMS_API_KEY to Vercel environment variables
    // ─────────────────────────────────────────────────────
    const fast2smsKey = process.env.FAST2SMS_API_KEY;
    if (fast2smsKey && !smsSent) {
      try {
        const smsRes = await fetch(
          `https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsKey}&route=otp&variables_values=${otp}&flash=0&numbers=${cleanPhone}`,
          {
            method: 'GET',
            headers: { 'cache-control': 'no-cache' },
          }
        );
        const smsData = await smsRes.json();
        if (smsData.return === true) {
          smsSent = true;
          smsProvider = 'Fast2SMS';
          console.log(`[Fast2SMS] OTP sent successfully to ${cleanPhone}`);
        } else {
          console.warn('[Fast2SMS] Failed:', JSON.stringify(smsData));
        }
      } catch (smsErr) {
        console.error('[Fast2SMS] Error:', smsErr);
      }
    }

    // ─────────────────────────────────────────────────────
    // PROVIDER 2: 2Factor.in (free 10 SMS/day, works on any Indian number)
    // Sign up at https://2factor.in → get API key
    // Add TWOFACTOR_API_KEY to Vercel environment variables
    // ─────────────────────────────────────────────────────
    if (!smsSent && process.env.TWOFACTOR_API_KEY) {
      try {
        const twoFacRes = await fetch(
          `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${cleanPhone}/${otp}/OTP1`
        );
        const twoFacData = await twoFacRes.json();
        if (twoFacData.Status === 'Success') {
          smsSent = true;
          smsProvider = '2Factor';
          console.log(`[2Factor] OTP sent to ${cleanPhone}`);
        }
      } catch (twoErr) {
        console.error('[2Factor] Error:', twoErr);
      }
    }

    // ─────────────────────────────────────────────────────
    // PROVIDER 3: Twilio Messages API (works for verified numbers + paid accounts)
    // ─────────────────────────────────────────────────────
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    if (!smsSent && twilioSid && twilioAuth && twilioPhone) {
      try {
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const formBody = new URLSearchParams({
          To: formattedPhone,
          From: twilioPhone,
          Body: `Your SahYog verification OTP is: ${otp}. Valid for 10 minutes. Do not share.`,
        });
        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        });
        if (twilioRes.ok) {
          smsSent = true;
          smsProvider = 'Twilio';
          console.log(`[Twilio] OTP sent to ${formattedPhone}`);
        } else {
          const errText = await twilioRes.text();
          console.warn('[Twilio] Send warning:', errText);
        }
      } catch (twErr) {
        console.error('[Twilio] Error:', twErr);
      }
    }

    // ─────────────────────────────────────────────────────
    // PROVIDER 4: Twilio Verify Service (for verified numbers in trial mode)
    // ─────────────────────────────────────────────────────
    const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
    if (!smsSent && twilioSid && twilioAuth && twilioVerifySid) {
      try {
        const verifyUrl = `https://verify.twilio.com/v2/Services/${twilioVerifySid}/Verifications`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const formBody = new URLSearchParams({ To: formattedPhone, Channel: 'sms' });
        const verifyRes = await fetch(verifyUrl, {
          method: 'POST',
          headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        });
        if (verifyRes.ok) {
          smsSent = true;
          smsProvider = 'TwilioVerify';
          console.log(`[Twilio Verify] OTP sent to ${formattedPhone}`);
        }
      } catch (verErr) {
        console.error('[Twilio Verify] Error:', verErr);
      }
    }

    console.log(`OTP dispatch result: smsSent=${smsSent}, provider=${smsProvider}, phone=${cleanPhone}`);

    const response = NextResponse.json({
      success: true,
      message: `OTP sent to +91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      smsSent,
      provider: smsProvider,
      expiresInSeconds: 600,
      formattedPhone,
    });

    // Store OTP in secure cookie as an additional verification fallback
    response.cookies.set('sahyog_pending_otp', `${cleanPhone}:${otp}`, {
      maxAge: 600,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
  }
}
