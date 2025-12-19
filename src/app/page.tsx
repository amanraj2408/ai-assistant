import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h1 className='text-5xl font-bold text-gray-900 mb-4'>
          AI Chat Assistant
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Chat with AI powered by Google Gemini. Get real-time weather, stock prices, and F1 racing information.
        </p>

        <Link href='/chat'>
          <Button size='lg' className='mt-4'>
            Start Chatting
          </Button>
        </Link>
      </div>

      <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
        <Card className='p-6 text-center hover:shadow-lg transition-shadow'>
          <Globe className='w-12 h-12 text-blue-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Weather Info</h3>
          <p className='text-gray-600'>
            Get real-time weather information for any location worldwide.
          </p>
        </Card>

        <Card className='p-6 text-center hover:shadow-lg transition-shadow'>
          <Zap className='w-12 h-12 text-green-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Stock Prices</h3>
          <p className='text-gray-600'>
            Check current stock prices and market trends instantly.
          </p>
        </Card>

        <Card className='p-6 text-center hover:shadow-lg transition-shadow'>
          <MessageSquare className='w-12 h-12 text-red-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>F1 Racing</h3>
          <p className='text-gray-600'>
            Get the latest Formula 1 race schedules and information.
          </p>
        </Card>
      </div>
    </div>
  );
}
