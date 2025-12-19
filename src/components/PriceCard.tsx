'use client';

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card } from './ui/card';

interface PriceCardProps {
  data: {
    symbol: string;
    price: number;
    change: number;
    changePercent: string;
    timestamp: string;
  };
}

export default function PriceCard({ data }: PriceCardProps) {
  const isPositive = data.change >= 0;

  return (
    <Card className='p-4 bg-gradient-to-br from-green-100 to-emerald-100 border-0'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='font-bold text-lg text-gray-900'>{data.symbol}</h3>
          <p className='text-gray-700 mt-1'>Stock Price</p>
        </div>
        <DollarSign size={32} className='text-green-600' />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-lg p-3'>
          <div className='text-3xl font-bold text-gray-900'>
            ${data.price.toFixed(2)}
          </div>
          <p className='text-sm text-gray-600'>Current Price</p>
        </div>

        <div className='bg-white rounded-lg p-3 flex flex-col justify-center'>
          <div className='flex items-center gap-2'>
            {isPositive ? (
              <TrendingUp size={20} className='text-green-600' />
            ) : (
              <TrendingDown size={20} className='text-red-600' />
            )}
            <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent})
            </span>
          </div>
          <p className='text-xs text-gray-600 mt-1'>{data.timestamp}</p>
        </div>
      </div>
    </Card>
  );
}
