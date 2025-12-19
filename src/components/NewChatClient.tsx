"use client";

import { useState } from 'react';
import { createChatSession } from '@/server/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function NewChatClient() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateChat = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const session = await createChatSession(title);
      router.push(`/chat/${session.id}`);
    } catch (error) {
      console.error('Error creating chat:', error);
      alert('Failed to create chat session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex-1 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-6'>Start a New Chat</h1>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Chat Title
            </label>
            <Input
              type='text'
              placeholder='e.g., Weather Discussion, Stock Analysis'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateChat();
                }
              }}
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleCreateChat}
            disabled={isLoading || !title.trim()}
            className='w-full'
          >
            {isLoading ? 'Creating...' : 'Create Chat'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
