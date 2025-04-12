'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const modulesData = [
  {
    id: 1,
    title: 'Введение в логистику',
    description: 'Понятие и цели логистики, роль логиста, направления и тренды.',
  },
  {
    id: 2,
    title: 'Складская логистика',
    description: 'Типы складов и их функции, принципы размещения товаров, FIFO, LIFO, ABC-анализ.',
  },
  {
    id: 3,
    title: 'Цепи поставок и логистические процессы',
    description: 'Участники цепи поставок, этапы движения товаров, Инкотермс.',
  },
  {
    id: 4,
    title: 'Транспортная логистика',
    description: 'Оптимизация транспортных маршрутов, выбор транспорта, документооборот.',
  },
  {
    id: 5,
    title: 'Виды и выбор транспорта',
    description: 'Классификация транспорта, критерии выбора оптимального вида транспорта.',
  },
  {
    id: 6,
    title: 'Словарь терминов',
    description: 'Основные термины и определения в логистике.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 md:p-8 lg:p-12">
      {/* Header */}
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
          Основы логистики
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mt-2">
          Курс для начинающих логистов
        </p>
      </header>

      {/* Start Learning Button */}
      <Link href="/modules">
        <Button className="bg-primary text-primary-foreground rounded-full px-6 py-3 md:px-8 md:py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-slide-in-bottom mb-8">
          Начать обучение
        </Button>
      </Link>

      {/* About the Course */}
      <section className="mb-12 w-full max-w-3xl animate-slide-in-bottom">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">О курсе</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Этот курс предназначен для тех, кто начинает свой путь в логистике. Вы узнаете основные{' '}
          <span className="font-semibold">понятия</span>, <span className="font-semibold">процессы</span> и{' '}
          <span className="font-semibold">инструменты</span>, необходимые для успешной работы в этой области. Мы рассмотрим ключевые аспекты, такие как{' '}
          <span className="font-semibold">складская логистика</span>, <span className="font-semibold">управление цепями поставок</span> и{' '}
          <span className="font-semibold">транспортная логистика</span>.
        </p>
        <ul className="list-disc pl-5 mt-4 text-muted-foreground text-base md:text-lg">
          <li>Получите базовые знания в логистике</li>
          <li>Узнаете о ключевых процессах и инструментах</li>
          <li>Подготовитесь к работе в логистической сфере</li>
        </ul>
        <div className="mt-4">
          <img
            src="https://picsum.photos/600/400?random=1"
            alt="Logistics Overview"
            className="rounded-md shadow-lg"
          />
          <p className="text-sm text-muted-foreground mt-2">Обзор логистических процессов.</p>
        </div>
      </section>

      {/* Course Modules */}
      <section className="w-full max-w-6xl animate-slide-in-bottom">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">Модули курса</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.map((module) => (
            <Card key={module.id} className="rounded-lg shadow-md transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{module.description}</CardDescription>
                <img
                  src={`https://picsum.photos/400/200?random=${module.id}`}
                  alt={`Logistics ${module.title}`}
                  className="mt-4 rounded-md shadow-sm"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
