'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import ChatMessage from './ChatMessage';
import { useChat } from 'ai/react';

interface ChatInterfaceProps {
  sessionId: number;
}

export default function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const { data: session } = useSession();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { sessionId },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!session) {
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-gray-500'>Please sign in to use the chat</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 mb-4'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500 text-center'>
              Start a conversation! Ask me about weather, stocks, F1 races, or anything else.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className='p-4 border-t border-gray-200'>
        <div className='flex gap-2'>
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder='Type your message...'
            rows={3}
            disabled={isLoading}
            className='flex-1'
          />
          <Button type='submit' disabled={isLoading} size='lg' className='self-end'>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
}
