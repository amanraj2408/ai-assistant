'use client';

import { formatDate } from '@/lib/utils';
import { Card } from './ui/card';

interface MessageContent {
  role: 'user' | 'assistant';
  content: string;
  toolName?: string;
  toolOutput?: string;
  createdAt?: Date | string;
}

interface ChatMessageProps {
  message: MessageContent;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <Card className={`max-w-xs lg:max-w-md px-4 py-2 ${isUser ? 'bg-blue-600 text-white border-0' : 'bg-gray-100'}`}>
        <p className={`text-sm ${isUser ? 'text-white' : 'text-gray-900'}`}>
          {message.content}
        </p>

        {message.toolName && message.toolOutput && (
          <div className='mt-2 pt-2 border-t border-gray-300'>
            <p className={`text-xs font-semibold ${isUser ? 'text-blue-100' : 'text-gray-600'}`}>
              {message.toolName}
            </p>
            <p className={`text-xs mt-1 ${isUser ? 'text-blue-50' : 'text-gray-700'}`}>
              {message.toolOutput}
            </p>
          </div>
        )}

        {message.createdAt && (
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-600'}`}>
            {formatDate(message.createdAt)}
          </p>
        )}
      </Card>
    </div>
  );
}
