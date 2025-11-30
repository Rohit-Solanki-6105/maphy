import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // Delete empty sessions (no messages) older than 1 minute
  const cutoff = new Date(Date.now() - 60 * 1000);
  const emptySessions = await prisma.chatSession.findMany({
    where: {
      messages: { none: {} },
      createdAt: { lt: cutoff },
    },
  });
  for (const session of emptySessions) {
    await prisma.chatSession.delete({ where: { id: session.id } });
  }
  const sessions = await prisma.chatSession.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ sessions });
}

export async function PATCH(req: NextRequest) {
  const { id, name } = await req.json();
  if (!id || typeof name !== "string") {
    return NextResponse.json({ error: "Missing id or name" }, { status: 400 });
  }
  const session = await prisma.chatSession.update({
    where: { id },
    data: { name },
  });
  return NextResponse.json({ session });
}