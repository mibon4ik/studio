'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckCircle, Lock, LockOpen} from 'lucide-react';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
import React from 'react';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';

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
    description: 'Типы складов и их функции, принципы размещения товаров, FIFO, LIFO, ABC-анализ.',
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

export default function ModulesPage() {
  const [modules, setModules] = useState(modulesData);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userId = 'user123'; // Replace with actual user ID
  const router = useRouter();
  const {toast} = useToast();
  const [backendReachable, setBackendReachable] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        setBackendReachable(response.ok);
      } catch (error) {
        setBackendReachable(false);
        console.error('Backend не доступен:', error);
      }
    };

    checkBackend();
  }, []);

  useEffect(() => {
    const getCompletedModules = async () => {
      if (!backendReachable) {
        console.warn('Бекенд недоступен, пропуск получения завершенных модулей.');
        toast({
          title: "Ошибка",
          description: "Бекенд недоступен. Невозможно получить завершенные модули.",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/completed/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCompletedModules(data);
          // Update module completion status based on fetched data
          setModules(prevModules => {
            return prevModules.map(module => ({
              ...module,
              isCompleted: data.includes(module.id)
            }));
          });
        } else {
          toast({
            title: "Ошибка",
            description: `Не удалось получить пройденные модули: ${response.status}`,
            variant: "destructive",
          });
          console.error('Failed to fetch completed modules:', response.status);
        }
      } catch (error) {
        toast({
          title: "Ошибка",
          description: `Ошибка при получении пройденных модулей: ${error}`,
          variant: "destructive",
        });
        console.error('Error fetching completed modules:', error);
      }
    };

    getCompletedModules();
  }, [userId, toast, backendReachable]);

  const isModuleAvailable = (moduleId: number) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return false;

    if (module.prerequisites && module.prerequisites.length > 0) {
      return module.prerequisites.every((prerequisiteId) =>
        completedModules.includes(prerequisiteId)
      );
    }
    return true;
  };

  const handleModuleComplete = async (moduleId: number) => {
    if (!backendReachable) {
      toast({
        title: "Ошибка",
        description: "Бекенд недоступен. Невозможно завершить модуль.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/complete/${userId}/${moduleId}`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: "Успех",
          description: `Модуль ${moduleId} успешно завершен!`,
        });
        setCompletedModules(prev => [...prev, moduleId]);
        setModules(prevModules =>
          prevModules.map(module =>
            module.id === moduleId ? {...module, isCompleted: true} : module
          )
        );
      } else {
        toast({
          title: "Ошибка",
          description: `Не удалось завершить модуль: ${response.status}`,
          variant: "destructive",
        });
        console.error('Failed to complete module:', response.status);
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: `Ошибка при завершении модуля: ${error}`,
        variant: "destructive",
      });
      console.error('Error completing module:', error);
    }
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, modules.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-bottom');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, [modules]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
        Изучите Наши <span className="text-primary">Модули</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`rounded-lg shadow-md transition-all duration-300 hover:scale-105  ${
              !isModuleAvailable(module.id) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  {module.title}
                  {completedModules.includes(module.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : isModuleAvailable(module.id) ? (
                    <LockOpen className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </CardTitle>
                <CardDescription className="text-sm">{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between">
                <div>
                  <ul className="mb-4">
                    {module.quizQuestions.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {item.question}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  {isModuleAvailable(module.id) ? (
                    <Link
                      href={`/modules/${module.id}`}
                      className="text-primary hover:underline"
                    >
                      Перейти к модулю
                    </Link>
                  ) : (
                    <span className="text-gray-500">Заблокировано. Завершите предыдущие модули.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
