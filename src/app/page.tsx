'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4 animate-fade-in">
        <span className="text-primary">Logistics</span> Ace
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl text-center mb-8 animate-slide-in-bottom">
        Your interactive guide to mastering logistics essentials.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <img
          src="https://picsum.photos/200/150"
          alt="Truck"
          className="rounded-md shadow-md animate-fade-in w-1/3 md:w-auto"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Warehouse"
          className="rounded-md shadow-md animate-fade-in w-1/3 md:w-auto"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Ship"
          className="rounded-md shadow-md animate-fade-in w-1/3 md:w-auto"
        />
      </div>
      <Link href="/modules">
        <Button className="bg-primary text-primary-foreground rounded-full px-6 py-2 md:px-8 md:py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-bottom">
          Start Learning
        </Button>
      </Link>
    </div>
  );
}
