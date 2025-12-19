import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getChatSessions, createChatSession } from '@/server/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  const sessions = await getChatSessions();

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-900 text-white p-4 flex flex-col'>
        <Link href='/chat/new'>
          <Button className='w-full bg-blue-600 hover:bg-blue-700 mb-4 flex items-center justify-center gap-2'>
            <Plus size={20} />
            New Chat
          </Button>
        </Link>

        <div className='flex-1 overflow-y-auto'>
          <h3 className='text-sm font-semibold text-gray-400 mb-4'>Chat History</h3>
          <div className='space-y-2'>
            {sessions.map((sess) => (
              <Link
                key={sess.id}
                href={`/chat/${sess.id}`}
                className='block p-2 rounded hover:bg-gray-800 text-sm text-gray-300 truncate'
              >
                {sess.title}
              </Link>
            ))}
          </div>
        </div>

        <div className='border-t border-gray-700 pt-4'>
          <p className='text-xs text-gray-500'>Signed in as</p>
          <p className='text-sm font-medium text-gray-300'>{session.user.name}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {children}
      </div>
    </div>
  );
}
