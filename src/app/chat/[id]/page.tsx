import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ChatInterface from '@/components/ChatInterface';

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const sessionId = parseInt(id, 10);

  if (isNaN(sessionId)) {
    redirect('/chat');
  }

  return (
    <div className='flex-1 flex'>
      <ChatInterface sessionId={sessionId} />
    </div>
  );
}
