'use server';

import { db } from '@/db/db';
import { chatMessages, chatSessions, users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createChatSession(title: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const result = await db
    .insert(chatSessions)
    .values({
      userId: session.user.id,
      title,
    })
    .returning();

  return result[0];
}

export async function getChatSessions() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.userId, session.user.id))
    .orderBy(desc(chatSessions.updatedAt));
}

export async function getChatMessages(sessionId: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Verify user owns this session
  const sessionRecord = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.id, sessionId));

  if (!sessionRecord.length || sessionRecord[0].userId !== session.user.id) {
    throw new Error('Unauthorized: Session does not belong to user');
  }

  return await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.id);
}

export async function saveChatMessage(
  sessionId: number,
  role: 'user' | 'assistant',
  content: string,
  toolName?: string | null,
  toolOutput?: string | null
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Verify user owns this session
  const sessionRecord = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.id, sessionId));

  if (!sessionRecord.length || sessionRecord[0].userId !== session.user.id) {
    throw new Error('Unauthorized: Session does not belong to user');
  }

  const result = await db
    .insert(chatMessages)
    .values({
      sessionId,
      role,
      content,
      toolName: toolName || null,
      toolOutput: toolOutput || null,
    })
    .returning();

  return result[0];
}

export async function updateSessionTitle(
  sessionId: number,
  title: string
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  // Verify user owns this session
  const sessionRecord = await db
    .select()
    .from(chatSessions)
    .where(eq(chatSessions.id, sessionId));

  if (!sessionRecord.length || sessionRecord[0].userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const result = await db
    .update(chatSessions)
    .set({ title, updatedAt: new Date() })
    .where(eq(chatSessions.id, sessionId))
    .returning();

  return result[0];
}
