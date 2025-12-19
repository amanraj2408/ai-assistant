import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }

    const result = streamText({
      model: google('gemini-1.5-flash'),
      messages,
      system: `You are a helpful and friendly AI assistant. You can help with:
1. Answering general questions
2. Providing information on weather, stocks, and F1 racing
3. Having conversations about various topics

Always be conversational and helpful. If the user asks something you can't help with, be honest about your limitations.`,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

