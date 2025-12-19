import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from '@/lib/tools';
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
      tools,
      system: `You are a helpful and friendly AI assistant. You have access to real-time tools for:
1. Weather information (use getWeather for weather queries)
2. Stock prices (use getStockPrice for stock market queries)
3. F1 racing information (use getF1Races for F1 queries)

When users ask questions related to these topics, use the appropriate tool to get accurate, real-time data.
Always be conversational and helpful. If you use a tool, explain the results in a friendly manner.
If the user asks something you can't help with, be honest about your limitations.`,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
