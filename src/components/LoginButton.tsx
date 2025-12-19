'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Github, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    await signIn('github', { redirect: true, callbackUrl: '/chat' });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { redirect: true, callbackUrl: '/chat' });
  };

  return (
    <div className='space-y-4'>
      <Button
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className='w-full flex items-center justify-center gap-2'
      >
        <Github size={20} />
        Sign in with GitHub
      </Button>

      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        variant='outline'
        className='w-full flex items-center justify-center gap-2'
      >
        <Mail size={20} />
        Sign in with Google
      </Button>
    </div>
  );
}
