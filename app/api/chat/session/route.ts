import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await prisma.chatSession.create({
    data: {},
  });
  return NextResponse.json({ session });
}
