'use client';

import { Cloud, Droplets, Wind } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherCardProps {
  data: {
    location: string;
    country: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
}

export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className='p-4 bg-gradient-to-br from-blue-100 to-cyan-100 border-0'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='font-bold text-lg text-gray-900'>
            {data.location}, {data.country}
          </h3>
          <p className='capitalize text-gray-700 mt-1'>{data.description}</p>
        </div>
        <Cloud size={32} className='text-blue-500' />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-lg p-3'>
          <div className='text-3xl font-bold text-gray-900'>
            {data.temperature}°C
          </div>
          <p className='text-sm text-gray-600'>Feels like {data.feelsLike}°C</p>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-2 bg-white rounded-lg p-2'>
            <Droplets size={16} className='text-blue-500' />
            <span className='text-sm font-medium'>{data.humidity}%</span>
          </div>
          <div className='flex items-center gap-2 bg-white rounded-lg p-2'>
            <Wind size={16} className='text-blue-500' />
            <span className='text-sm font-medium'>{data.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
