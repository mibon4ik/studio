'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import React from 'react';
import {useParams} from 'next/navigation';

const modulesData = [
  {
    id: 1,
    title: 'Введение в логистику',
    description: 'Понятие и цели логистики, роль логиста, направления и тренды.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    description: 'Типы складов, принципы размещения, FIFO, LIFO, ABC-анализ.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [videoWatched, setVideoWatched] = useState(false);
  const [module, setModule] = useState(null);
  const [videoError, setVideoError] = useState(false);


  useEffect(() => {
    const currentModule = modulesData.find(m => m.id === parseInt(moduleId as string));
    if (currentModule) {
      setModule(currentModule);
    }
  }, [moduleId]);

  if (!module) {
    return <div>Модуль не найден.</div>;
  }

  const questions = module.quizQuestions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
        Модуль {moduleId} <span className="text-primary">Содержание</span>
      </h1>

      <div className="w-full max-w-3xl">
        <Card className="mb-6 animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Видео Лекция</CardTitle>
            <CardDescription className="text-sm">Посмотрите это видео, чтобы узнать больше о модуле.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              {videoError ? (
                 <p>Не удалось загрузить видео.</p>
                ) : (
              <iframe
                src={module.videoUrl}
                title="Rick Roll Video"
                allowFullScreen
                onError={handleVideoError}
                onEnded={() => setVideoWatched(true)}
                crossOrigin="anonymous"
              />
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Мини-Тест</CardTitle>
            <CardDescription className="text-sm">Проверьте свои знания с помощью этого короткого теста.</CardDescription>
          </CardHeader>
          <CardContent>
            {!quizCompleted ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">{currentQuestion?.question}</h2>
                <ul>
                  {currentQuestion?.options.map((option, index) => (
                    <li key={index} className="mb-2">
                      <label className="flex items-center">
                        <Input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={() => handleAnswerSelect(option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
                <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className="transition-all duration-300">
                  {currentQuestionIndex === questions.length - 1 ? 'Завершить Тест' : 'Следующий Вопрос'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Тест Завершен!</h3>
                <p className="text-lg">Ваш Счет: {score} / {questions.length}</p>
                <Button onClick={() => router.push('/modules')} className="transition-all duration-300">Обратно к Модулям</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
