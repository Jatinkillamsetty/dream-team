'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function Home() {
  const router = useRouter();

  const buttonpressed = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="text-center bg-gray-900 p-10 rounded-xl ">

        

        <h1 className="text-4xl font-bold text-white ">
          Habit Tracker
        </h1>

        

        <Button onClick={buttonpressed} variant="danger" size="lg">
          Get Started
        </Button>

      </div>

    </div>
  );
}