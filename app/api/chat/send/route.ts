import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  let content = "";
  let chatSessionId = "";
  let domain = "";
  let model = "gemini-2.5-pro";
  let files: File[] = [];
  let isMultipart = false;
  try {
    const formData = await req.formData();
    isMultipart = true;
    content = formData.get('content') as string;
    chatSessionId = formData.get('chatSessionId') as string;
    domain = formData.get('domain') as string;
    model = formData.get('model') as string || "gemini-2.5-pro";
    for (const entry of formData.getAll('files')) {
      if (entry instanceof File) files.push(entry);
    }
    console.log("data:", chatSessionId, domain, model, files);
  } catch {
    // fallback to JSON body for non-file requests
    const body = await req.json();
    content = body.content;
    chatSessionId = body.chatSessionId;
    domain = body.domain;
    model = body.model || "gemini-2.5-pro";
    files = [];
  }
  console.log('Received chatSessionId:', chatSessionId);

  // Validate chatSessionId exists
  if (!chatSessionId) {
    return NextResponse.json({ error: 'Missing chatSessionId.' }, { status: 400 });
  }
  const sessionExists = await prisma.chatSession.findUnique({ where: { id: chatSessionId } });
  console.log('Session exists:', !!sessionExists);
  if (!sessionExists) {
    return NextResponse.json({ error: 'Invalid chatSessionId.' }, { status: 400 });
  }

  // Save user message
  const userMessage = await prisma.message.create({
    data: {
      content,
      sender: 'user',
      chatSessionId,
    },
  });

  // Prepare file text for Gemini prompt
  let fileText = '';
  for (const file of files) {
    // Only read text files for now
    if (file.type.startsWith('text') || file.name.endsWith('.txt')) {
      const text = await file.text();
      fileText += `\n---\nFile: ${file.name}\n${text}\n`;
    }
  }

  // Add domain context to Gemini prompt
  let domainPrefix = '';
  switch (domain) {
    case 'Math':
      domainPrefix = 'You are a math research and solution agent. Answer with clear steps, equations, and explanations.';
      break;
    case 'Graphing':
      domainPrefix = 'You are a graphing expert. Provide graphing solutions, visual descriptions, and code if needed.';
      break;
    case 'Physics':
      domainPrefix = 'You are a physics research and solution agent. Use formulas, laws, and clear reasoning.';
      break;
    case 'Computer Science':
      domainPrefix = 'You are a computer science research and solution agent. Provide code, algorithms, and explanations.';
      break;
    default:
      domainPrefix = '';
  }
  // Compose prompt with file contents
  const prompt = domainPrefix ? `${domainPrefix}\n${content}${fileText}` : `${content}${fileText}`;
  const modelId = model === "gemini-2.5-flash" ? "gemini-2.5-flash" : "gemini-2.5-pro";
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  const geminiData = await geminiResponse.json();
  const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Save Gemini message
  const geminiMessage = await prisma.message.create({
    data: {
      content: geminiText,
      sender: 'gemini',
      chatSessionId,
    },
  });

  return NextResponse.json({ userMessage, geminiMessage });
}
