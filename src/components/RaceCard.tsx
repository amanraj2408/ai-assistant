'use client';

import { Calendar, MapPin, Flag, Clock } from 'lucide-react';
import { Card } from './ui/card';

interface RaceCardProps {
  data: {
    round: string;
    name: string;
    circuit: string;
    date: string;
    time: string;
    location: string;
  };
}

export default function RaceCard({ data }: RaceCardProps) {
  return (
    <Card className='p-4 bg-gradient-to-br from-red-100 to-orange-100 border-0'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='font-bold text-lg text-gray-900'>
            Round {data.round}: {data.name}
          </h3>
          <p className='text-gray-700 mt-1'>{data.circuit}</p>
        </div>
        <Flag size={32} className='text-red-500' />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-lg p-3 flex items-center gap-2'>
          <Calendar size={16} className='text-red-500' />
          <div>
            <p className='text-xs text-gray-600'>Date</p>
            <p className='font-medium text-sm'>{data.date}</p>
          </div>
        </div>

        <div className='bg-white rounded-lg p-3 flex items-center gap-2'>
          <Clock size={16} className='text-red-500' />
          <div>
            <p className='text-xs text-gray-600'>Time</p>
            <p className='font-medium text-sm'>{data.time}</p>
          </div>
        </div>

        <div className='bg-white rounded-lg p-3 col-span-2 flex items-center gap-2'>
          <MapPin size={16} className='text-red-500' />
          <p className='font-medium text-sm'>{data.location}</p>
        </div>
      </div>
    </Card>
  );
}
