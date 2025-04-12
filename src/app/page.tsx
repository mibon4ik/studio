'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-4 animate-fade-in">
        <span className="text-primary">Logistics</span> Ace
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl text-center mb-8 animate-slide-in-bottom">
        Your interactive guide to mastering logistics essentials.
      </p>
      <div className="flex space-x-4 mb-8">
        <img
          src="https://picsum.photos/200/150"
          alt="Truck"
          className="rounded-md shadow-md animate-fade-in"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Warehouse"
          className="rounded-md shadow-md animate-fade-in"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Ship"
          className="rounded-md shadow-md animate-fade-in"
        />
      </div>
      <Link href="/modules">
        <Button className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-bottom">
          Start Learning
        </Button>
      </Link>
    </div>
  );
}
