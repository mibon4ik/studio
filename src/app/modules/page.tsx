'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useRef} from 'react';

const modules = [
  {
    id: 1,
    title: 'Introduction to Logistics',
    description: 'Understand the basics of logistics and its importance.',
  },
  {
    id: 2,
    title: 'Warehouse Logistics',
    description: 'Learn about warehouse management and optimization.',
  },
  {
    id: 3,
    title: 'Transportation Logistics',
    description: 'Explore the world of transportation and delivery systems.',
  },
  {
    id: 4,
    title: 'Supply Chains',
    description: 'Dive into the complexities of supply chain management.',
  },
  {
    id: 5,
    title: 'Practice and Case Studies',
    description: 'Real-world examples and case studies in logistics.',
  },
  {
    id: 6,
    title: 'Glossary of Terms',
    description: 'A comprehensive glossary of logistics terms.',
  },
];

export default function ModulesPage() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, modules.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in', 'slide-in-bottom');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cardRefs.current.forEach((card) => observer.observe(card));

    return () => {
      cardRefs.current.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-8">
        Explore Our <span className="text-primary">Modules</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module, index) => (
          <Card
            key={module.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Learn more about {module.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

