'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {useEffect, useState} from 'react';

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

const generateImageUrl = (title: string) => {
  const keywords = ['warehouse', 'truck', 'supply chain', 'delivery', 'transport'];
  const randomIndex = Math.floor(Math.random() * keywords.length);
  const keyword = keywords[randomIndex];
  const encodedTitle = encodeURIComponent(`Logistics ${keyword} ${title}`);
  return `https://source.unsplash.com/400x200/?${encodedTitle}`;
};

export default function Home() {
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const generateAllImageUrls = () => {
      const urls = {};
      modulesData.forEach((module) => {
        urls[module.id] = generateImageUrl(module.title);
      });
      setImageUrls(urls);
    };

    generateAllImageUrls();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Header */}
      <header className="text-center mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary animate-fade-in">
          Основы логистики
        </h1>
        <p className="text-muted-foreground text-base md:text-lg lg:text-xl mt-2 animate-fade-in">
          Курс для начинающих логистов
        </p>
      </header>

      {/* Start Learning Button */}
      <div className="text-center mb-8 md:mb-12 lg:mb-16 animate-slide-in-bottom">
        <Link href="/modules">
          <Button className="rounded-full px-6 py-3 md:px-8 md:py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Начать обучение
          </Button>
        </Link>
      </div>

      {/* About the Course */}
      <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-center">О курсе</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="md:pl-8 text-center md:text-left">
            <p className="text-muted-foreground text-base md:text-lg">
              Этот курс предназначен для тех, кто начинает свой путь в логистике. Вы узнаете основные{' '}
              <span className="font-semibold">понятия</span>, <span className="font-semibold">процессы</span> и{' '}
              <span className="font-semibold">инструменты</span>, необходимые для успешной работы в этой области.
            </p>
            <ul className="list-disc pl-5 mt-4 text-muted-foreground text-base md:text-lg">
              <li>Получите базовые знания в логистике</li>
              <li>Узнаете о ключевых процессах и инструментах</li>
              <li>Подготовитесь к работе в логистической сфере</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://axelor.com/wp-content/uploads/2021/07/module_achats.png"
              alt="Logistics Overview"
              width={400}
              height={300}
              className="object-cover rounded-md shadow-lg about-image"
              priority={true}
              style={{borderRadius: '12px'}}
            />
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-center">Модули курса</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesData.map((module) => (
            <Card key={module.id} className="rounded-lg shadow-md transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{module.description}</CardDescription>
                {imageUrls[module.id] && (
                  <Image
                    src={module.id === 1 ? "https://www.logisticsbusiness.com/wp-content/uploads/2016/12/Key-Visual_Logistics40.jpg" : imageUrls[module.id]}
                    alt={`Logistics ${module.title}`}
                    width={400}
                    height={200}
                    className="mt-4 rounded-md shadow-sm object-cover"
                    loader={({src, width, quality}) => `${src}&w=${width}&q=${quality || 75}`}
                    unoptimized={true}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
