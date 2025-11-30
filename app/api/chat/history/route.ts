import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatSessionId = searchParams.get('chatSessionId');
  if (!chatSessionId) {
    return NextResponse.json({ error: 'chatSessionId required' }, { status: 400 });
  }
  const messages = await prisma.message.findMany({
    where: { chatSessionId },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json({ messages });
}
