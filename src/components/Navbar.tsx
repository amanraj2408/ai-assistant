'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';
import LogoutButton from './LogoutButton';
import { MessageSquare, Github } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <Link href='/' className='flex items-center gap-2 font-bold text-xl text-blue-600'>
            <MessageSquare size={28} />
            AI Chat Assistant
          </Link>

          <div className='flex items-center gap-4'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-600 hover:text-gray-900'
            >
              <Github size={24} />
            </a>

            {session ? (
              <div className='flex items-center gap-4'>
                <span className='text-sm text-gray-600'>
                  {session.user?.name || session.user?.email}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <Link href='/auth/signin'>
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
