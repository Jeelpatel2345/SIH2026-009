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

    // Generate real 4-digit random OTP (stored in DB for verification)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const formattedPhone = `+91${cleanPhone}`;

    // Save OTP to database
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
    let useTwilioVerify = false; // Track if Twilio Verify was used (it sends its own code)

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    // ─────────────────────────────────────────────────────────────────
    // PROVIDER 1: Fast2SMS Quick SMS route (ANY Indian number, needs ₹100 balance)
    // Add ₹50 more to your Fast2SMS wallet to unlock this route
    // ─────────────────────────────────────────────────────────────────
    if (!smsSent && process.env.FAST2SMS_API_KEY) {
      try {
        const message = encodeURIComponent(`Your SahYog OTP is: ${otp}. Valid for 10 minutes. Do not share.`);
        const quickUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=q&message=${message}&language=english&flash=0&numbers=${cleanPhone}`;
        const smsRes = await fetch(quickUrl, { method: 'GET', headers: { 'cache-control': 'no-cache' } });
        const smsData = await smsRes.json();
        if (smsData.return === true) {
          smsSent = true;
          smsProvider = 'Fast2SMS-Quick';
          console.log(`[Fast2SMS Quick] OTP sent to ${cleanPhone}`);
        } else {
          console.warn('[Fast2SMS Quick]', JSON.stringify(smsData));

          // Fallback: OTP route (needs website verification at fast2sms.com)
          const otpUrl = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=otp&variables_values=${otp}&flash=0&numbers=${cleanPhone}`;
          const otpRes = await fetch(otpUrl, { method: 'GET', headers: { 'cache-control': 'no-cache' } });
          const otpData = await otpRes.json();
          if (otpData.return === true) {
            smsSent = true;
            smsProvider = 'Fast2SMS-OTP';
            console.log(`[Fast2SMS OTP] OTP sent to ${cleanPhone}`);
          } else {
            console.warn('[Fast2SMS OTP]', JSON.stringify(otpData));
          }
        }
      } catch (e) {
        console.error('[Fast2SMS] Error:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // PROVIDER 2: 2Factor.in (works any Indian number, free tier)
    // Get free API key at https://2factor.in
    // ─────────────────────────────────────────────────────────────────
    if (!smsSent && process.env.TWOFACTOR_API_KEY) {
      try {
        const res = await fetch(
          `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${cleanPhone}/${otp}/OTP1`
        );
        const data = await res.json();
        if (data.Status === 'Success') {
          smsSent = true;
          smsProvider = '2Factor';
          console.log(`[2Factor] OTP sent to ${cleanPhone}`);
        }
      } catch (e) {
        console.error('[2Factor] Error:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // PROVIDER 3: Twilio Verify Service
    // Works for: your verified number in trial, ALL numbers in paid mode
    // Note: Twilio Verify sends its OWN 6-digit code — verify-otp handles both
    // ─────────────────────────────────────────────────────────────────
    if (!smsSent && twilioSid && twilioAuth && twilioVerifySid) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const res = await fetch(
          `https://verify.twilio.com/v2/Services/${twilioVerifySid}/Verifications`,
          {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ To: formattedPhone, Channel: 'sms' }).toString(),
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'pending') {
            smsSent = true;
            useTwilioVerify = true;
            smsProvider = 'TwilioVerify';
            console.log(`[Twilio Verify] OTP dispatched to ${formattedPhone}`);
          }
        } else {
          const err = await res.text();
          console.warn('[Twilio Verify]', err);
        }
      } catch (e) {
        console.error('[Twilio Verify] Error:', e);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // PROVIDER 4: Twilio Messages API (trial: verified numbers only)
    // ─────────────────────────────────────────────────────────────────
    if (!smsSent && twilioSid && twilioAuth && twilioPhone) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioAuth}`).toString('base64');
        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              To: formattedPhone,
              From: twilioPhone,
              Body: `Sent from your Twilio trial account - Your SahYog OTP is: ${otp}. Valid 10 minutes.`,
            }).toString(),
          }
        );
        if (res.ok) {
          smsSent = true;
          smsProvider = 'TwilioSMS';
          console.log(`[Twilio SMS] OTP sent to ${formattedPhone}`);
        } else {
          const err = await res.text();
          console.warn('[Twilio SMS]', err);
        }
      } catch (e) {
        console.error('[Twilio SMS] Error:', e);
      }
    }

    console.log(`OTP result: sent=${smsSent}, provider=${smsProvider}, phone=${cleanPhone}`);

    const response = NextResponse.json({
      success: true,
      message: `OTP sent to +91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      smsSent,
      provider: smsProvider,
      // If Twilio Verify was used, the code is Twilio's own 6-digit code
      // For DB-based providers (Fast2SMS, 2Factor), our 4-digit code is used
      useTwilioVerify,
      expiresInSeconds: 600,
      formattedPhone,
    });

    // Always store our DB OTP in a secure cookie as fallback
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
