'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckCircle, Lock, LockOpen} from 'lucide-react';
import Link from 'next/link';
import {useState} from 'react';
import React from 'react';

const modulesData = [
  {
    id: 1,
    title: 'Введение в логистику',
    description: 'Понятие и цели логистики, роль логиста, направления и тренды.',
    whatYoullLearn: [
      'Понятие и цели логистики',
      'Роль логиста в компании',
      'Направления логистики',
      'Современные тренды (логистика 4.0)',
    ],
    includes: [
      '📺 Включает видео-лекцию',
      '📝 PDF-лекция и презентация',
      '🧠 Мини-тест (5 вопросов)',
      '📁 Скачать шаблоны (организационная схема логистики)',
    ],
    href: '/modules/1',
    isCompleted: false,
    prerequisites: [],
  },
  {
    id: 2,
    title: 'Цепи поставок (Supply Chain)',
    description: 'Участники цепи поставок, этапы движения товаров, Инкотермс.',
    whatYoullLearn: [
      'Участники цепи поставок',
      'Этапы движения товаров',
      'Инкотермс (условия поставки)',
      'Планирование логистических операций',
    ],
    includes: ['📺 Видеоурок с инфографикой', '📝 Лекция + практическая задача', '🧠 Тест (10 вопросов)'],
    href: '/modules/2',
    isCompleted: false,
    prerequisites: [1],
  },
  {
    id: 3,
    title: 'Складская логистика',
    description: 'Типы складов, принципы размещения, FIFO, LIFO, ABC-анализ.',
    whatYoullLearn: [
      'Типы складов и их функции',
      'Принципы размещения товаров',
      'FIFO, LIFO, ABC-анализ',
      'WMS-системы',
    ],
    includes: ['📺 Демонстрация интерфейса WMS', '📁 Скачать чек-лист приёмки товара'],
    href: '/modules/3',
    isCompleted: false,
    prerequisites: [2],
  },
  {
    id: 4,
    title: 'Транспортная логистика',
    description: 'Оптимизация транспортных маршрутов, выбор транспорта, документооборот.',
    whatYoullLearn: [
      'Выбор видов транспорта',
      'Оптимизация маршрутов',
      'Оформление транспортных документов',
      'Страхование грузов',
    ],
    includes: ['📝 Лекция с примерами расчетов', '📁 Шаблоны документов', '🌐 Вебинар с экспертом'],
    href: '/modules/4',
    isCompleted: false,
    prerequisites: [3],
  },
  {
    id: 5,
    title: 'Управление запасами',
    description: 'Методы прогнозирования спроса, определение оптимального уровня запасов.',
    whatYoullLearn: [
      'Прогнозирование спроса',
      'Оптимизация запасов',
      'Методы контроля',
      'Снижение издержек',
    ],
    includes: ['📊 Интерактивные графики', '📝 Практикум с кейсами', '📚 Дополнительные материалы'],
    href: '/modules/5',
    isCompleted: false,
    prerequisites: [4],
  },
  {
    id: 6,
    title: 'Международная логистика',
    description: 'Особенности ВЭД, таможенное оформление, международные перевозки.',
    whatYoullLearn: [
      'Особенности ВЭД',
      'Таможенное оформление',
      'Международные перевозки',
      'Валютный контроль',
    ],
    includes: ['🌐 Онлайн-курс', '📝 Глоссарий терминов', '💼 Примеры из практики'],
    href: '/modules/6',
    isCompleted: false,
    prerequisites: [5],
  },
];

export default function ModulesPage() {
  const [modules, setModules] = useState(modulesData);

  const isModuleAvailable = (moduleId: number) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return false;

    if (module.prerequisites && module.prerequisites.length > 0) {
      return module.prerequisites.every((prerequisiteId) =>
        modules.find((m) => m.id === prerequisiteId)?.isCompleted
      );
    }
    return true;
  };

  const handleModuleComplete = (moduleId: number) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId ? {...module, isCompleted: true} : module
      )
    );
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
        Изучите Наши <span className="text-primary">Модули</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`rounded-lg shadow-md transition-all duration-300 hover:scale-105 animate-slide-in-bottom ${
              !isModuleAvailable(module.id) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {module.title}
                {module.isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : isModuleAvailable(module.id) ? (
                  <LockOpen className="h-4 w-4 text-gray-500" />
                ) : (
                  <Lock className="h-4 w-4 text-gray-400" />
                )}
              </CardTitle>
              <CardDescription className="text-sm">{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {module.whatYoullLearn.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-4">
                {module.includes.map((item, i) => (
                  <li key={i} className="text-xs">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={isModuleAvailable(module.id) ? module.href : '#'}
                className={`text-primary hover:underline ${
                  !isModuleAvailable(module.id) ? 'text-gray-500 cursor-not-allowed' : ''
                }`}
              >
                {isModuleAvailable(module.id) ? (
                  <Link
                    href={{
                      pathname: `/modules/${module.id}`,
                      query: {moduleComplete: handleModuleComplete.bind(null, module.id)},
                    }}
                    onClick={(e) => {
                      if (!isModuleAvailable(module.id)) {
                        e.preventDefault();
                      }
                    }}
                  >
                  Узнать больше о {module.title}
                  </Link>
                ) : (
                  <span className="text-gray-500">Заблокировано. Завершите предыдущие модули.</span>
                )}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  }
