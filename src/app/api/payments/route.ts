import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateTransactionCode } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payment = await prisma.payment.create({
      data: {
        bookingId: body.bookingId,
        transactionCode: generateTransactionCode(),
        amount: body.amount,
        method: body.method || 'UPI',
        status: 'COMPLETED',
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
