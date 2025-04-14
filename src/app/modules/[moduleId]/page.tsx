'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import React from 'react';
import {useParams} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';
import {useModuleStore} from '@/store/moduleStore';
import {useAuth} from '@/hooks/use-auth';

import styles from './module.module.css';
import Quiz from './quiz';

const modulesData = [
  {
    id: 1,
    title: 'Введение в логистику',
    description: 'Понятие и цели логистики, роль логиста, направления и тренды.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое логистика?',
        options: ['Искусство войны', 'Процесс планирования и выполнения эффективной транспортировки и хранения товаров', 'Вид танца', 'Раздел медицины'],
        correctAnswer: 'Процесс планирования и выполнения эффективной транспортировки и хранения товаров',
      },
      {
        question: 'Какова роль логиста?',
        options: ['Делать кофе', 'Управлять потоком товаров и информации', 'Проектировать здания', 'Писать романы'],
        correctAnswer: 'Управлять потоком товаров и информации',
      },
    ],
    isCompleted: false,
    prerequisites: [],
  },
  {
    id: 2,
    title: 'Цепи поставок (Supply Chain)',
    description: 'Участники цепи поставок, этапы движения товаров, Инкотермс.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое цепь поставок?',
        options: ['Металлическая цепь для поставок', 'Сеть между компанией и ее поставщиками для производства и распространения конкретного продукта', 'Способ приготовления пищи', 'Государственное регулирование'],
        correctAnswer: 'Сеть между компанией и ее поставщиками для производства и распространения конкретного продукта',
      },
      {
        question: 'Что такое Инкотермс?',
        options: ['Вид насекомого', 'Международные коммерческие условия, определяющие обязанности продавцов и покупателей при доставке товаров', 'Марка чернил', 'Стиль дизайна интерьера'],
        correctAnswer: 'Международные коммерческие условия, определяющие обязанности продавцов и покупателей при доставке товаров',
      },
    ],
    isCompleted: false,
    prerequisites: [1],
  },
  {
    id: 3,
    title: 'Складская логистика',
    description: 'Типы складов и их функции, принципы размещения товаров, FIFO, LIFO, ABC-анализ.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое складская логистика?',
        options: ['Изучение облаков', 'Управление хранением и обработкой товаров на складе', 'Вид музыки', 'Процесс приготовления хлеба'],
        correctAnswer: 'Управление хранением и обработкой товаров на складе',
      },
      {
        question: 'Что такое FIFO?',
        options: ['Вид корма для собак', 'Первый пришел, первый ушел - метод оценки запасов', 'Вид птицы', 'Марка автомобиля'],
        correctAnswer: 'Первый пришел, первый ушел - метод оценки запасов',
      },
    ],
    isCompleted: false,
    prerequisites: [2],
  },
  {
    id: 4,
    title: 'Транспортная логистика',
    description: 'Оптимизация транспортных маршрутов, выбор транспорта, документооборот.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое транспортная логистика?',
        options: ['Изучение древних культур', 'Оптимизация транспортировки товаров', 'Вид спорта', 'Искусство живописи'],
        correctAnswer: 'Оптимизация транспортировки товаров',
      },
      {
        question: 'Какова основная цель транспортной логистики?',
        options: ['Потратить как можно больше времени', 'Перемещать товары эффективно и экономично', 'Создавать пробки', 'Загрязнять окружающую среду'],
        correctAnswer: 'Перемещать товары эффективно и экономично',
      },
    ],
    isCompleted: false,
    prerequisites: [3],
  },
  {
    id: 5,
    title: 'Управление запасами',
    description: 'Методы прогнозирования спроса, определение оптимального уровня запасов.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое управление запасами?',
        options: ['Процесс подсчета звезд', 'Методы и техники для эффективного управления уровнями запасов', 'Вид танца', 'Процесс приготовления сыра'],
        correctAnswer: 'Методы и техники для эффективного управления уровнями запасов',
      },
      {
        question: 'Что такое прогнозирование спроса?',
        options: ['Предсказание погоды', 'Оценка будущего спроса клиентов', 'Вид фокуса', 'Процесс приготовления вина'],
        correctAnswer: 'Оценка будущего спроса клиентов',
      },
    ],
    isCompleted: false,
    prerequisites: [4],
  },
  {
    id: 6,
    title: 'Международная логистика',
    description: 'Особенности ВЭД, таможенное оформление, международные перевозки.',
    videoUrl: 'https://www.youtube.com/embed/wtlM-pAMWAA?si=SZvN4VjNzeO40rlz',
    quizQuestions: [
      {
        question: 'Что такое международная логистика?',
        options: ['Изучение языков', 'Управление потоком товаров через международные границы', 'Вид спорта', 'Искусство скульптуры'],
        correctAnswer: 'Управление потоком товаров через международные границы',
      },
      {
        question: 'Что такое таможенное оформление?',
        options: ['Вид зубной пасты', 'Процесс соблюдения правил импорта/экспорта', 'Марка автомобиля', 'Стиль музыки'],
        correctAnswer: 'Процесс соблюдения правил импорта/экспорта',
      },
    ],
    isCompleted: false,
    prerequisites: [5],
  },
];

interface ModulePageProps {
  params: { moduleId: string };
}

export default function ModulePage() {
  const {moduleId} = useParams();
  const router = useRouter();
  const [module, setModule] = useState(null);
  const {toast} = useToast();
  const {user} = useAuth();

  const {completeModule} = useModuleStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const currentModule = modulesData.find(m => m.id === parseInt(moduleId as string));
    if (currentModule) {
      setModule(currentModule);
    }
  }, [moduleId]);

  if (!module) {
    return <div>Модуль не найден.</div>;
  }

  const handleCompleteModule = () => {
    completeModule(parseInt(moduleId as string));
    toast({
      title: 'Поздравляем!',
      description: `Модуль ${moduleId} успешно завершен!`,
    });
    router.push('/modules');
  };

  return (
    <div className={styles.moduleContainer}>
      <h1 className={styles.moduleTitle}>
        Модуль {moduleId} <span className="text-primary">Содержание</span>
      </h1>

      <div className={styles.moduleContent}>
        <Card className={styles.videoCard}>
          <CardHeader>
            <CardTitle className="text-xl">Видео Лекция</CardTitle>
            <CardDescription className="text-sm">Посмотрите это видео, чтобы узнать больше о модуле.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.videoContainer}>
              <iframe
                src={module.videoUrl}
                title="YouTube video"
                allowFullScreen
                className={styles.videoFrame}
              />
            </div>
          </CardContent>
        </Card>

        <Quiz
          questions={module.quizQuestions || []}
          moduleId={parseInt(moduleId as string)}
          onCompleteModule={handleCompleteModule}
        />
      </div>
    </div>
  );
}
