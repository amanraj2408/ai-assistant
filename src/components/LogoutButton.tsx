'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
      variant='outline'
      className='flex items-center gap-2'
    >
      <LogOut size={20} />
      Sign out
    </Button>
  );
}
