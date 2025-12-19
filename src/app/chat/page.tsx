import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewChatClient from '@/components/NewChatClient';

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/auth/signin');

  return <NewChatClient />;
}
