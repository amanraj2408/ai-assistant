import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Chat Assistant',
  description: 'Chat with AI powered by Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50'>
        <Providers>
          <Navbar />
          <main className='max-w-7xl mx-auto'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
