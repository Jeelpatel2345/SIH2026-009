import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { bookingId: params.bookingId },
      include: { sender: true },
      orderBy: { sentAt: 'asc' },
    });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const body = await request.json();
    const message = await prisma.chatMessage.create({
      data: {
        bookingId: params.bookingId,
        senderId: body.senderId,
        messageType: body.messageType || 'TEXT',
        content: body.content,
        locationLabel: body.locationLabel,
        imageUrl: body.imageUrl,
      },
    });
    return NextResponse.json({ message });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
