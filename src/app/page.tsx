'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useEffect, useRef} from 'react';

export default function Home() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      button.addEventListener('mouseenter', () => {
        button.classList.add('scale-105', 'shadow-lg');
      });

      button.addEventListener('mouseleave', () => {
        button.classList.remove('scale-105', 'shadow-lg');
      });
    }

    return () => {
      if (button) {
        button.removeEventListener('mouseenter', () => {
          button.classList.add('scale-105', 'shadow-lg');
        });

        button.removeEventListener('mouseleave', () => {
          button.classList.remove('scale-105', 'shadow-lg');
        });
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-4">
        <span className="text-primary">Logistics</span> Ace
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl text-center mb-8">
        Your interactive guide to mastering logistics essentials.
      </p>
      <div className="flex space-x-4 mb-8">
        <img
          src="https://picsum.photos/200/150"
          alt="Truck"
          className="rounded-md shadow-md"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Warehouse"
          className="rounded-md shadow-md"
        />
        <img
          src="https://picsum.photos/200/150"
          alt="Ship"
          className="rounded-md shadow-md"
        />
      </div>
      <Link href="/modules">
        <Button
          ref={buttonRef}
          className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Start Learning
        </Button>
      </Link>
    </div>
  );
}
