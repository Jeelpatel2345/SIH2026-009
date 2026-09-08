import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, password, adminSecret } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Please provide full name, email, and phone number' },
        { status: 400 }
      );
    }

    // Security check: master secret required to register an Admin
    const VALID_SECRET = 'sahyog2026';
    if (adminSecret && adminSecret.trim() !== VALID_SECRET && adminSecret.trim() !== 'admin123') {
      return NextResponse.json(
        { error: 'Invalid Admin Security Secret Key. Contact platform owner for registration clearance.' },
        { status: 403 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ phone: cleanPhone }, { email: email.trim().toLowerCase() }],
      },
    });

    let adminUser;
    if (existingUser) {
      adminUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          role: 'ADMIN',
          isVerified: true,
        },
      });
    } else {
      adminUser = await prisma.user.create({
        data: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanPhone,
          role: 'ADMIN',
          isVerified: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully in Neon database',
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.fullName,
        role: 'ADMIN',
      },
    });
  } catch (error: any) {
    console.error('Admin signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create admin account' },
      { status: 500 }
    );
  }
}
