'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import React from 'react';

const rickRollUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const quizQuestions = {
  1: [
    {
      question: 'What is logistics?',
      options: ['The art of war', 'The process of planning and executing the efficient transportation and storage of goods', 'A type of dance', 'A branch of medicine'],
      correctAnswer: 'The process of planning and executing the efficient transportation and storage of goods',
    },
    {
      question: 'What is the role of a logistician?',
      options: ['To make coffee', 'To manage the flow of goods and information', 'To design buildings', 'To write novels'],
      correctAnswer: 'To manage the flow of goods and information',
    },
  ],
  2: [
    {
      question: 'What is a supply chain?',
      options: ['A metal chain used for supplies', 'A network between a company and its suppliers to produce and distribute a specific product', 'A type of cooking method', 'A government regulation'],
      correctAnswer: 'A network between a company and its suppliers to produce and distribute a specific product',
    },
    {
      question: 'What are Incoterms?',
      options: ['A type of insect', 'International Commercial Terms defining responsibilities of sellers and buyers for delivery of goods', 'A brand of ink', 'A style of interior design'],
      correctAnswer: 'International Commercial Terms defining responsibilities of sellers and buyers for delivery of goods',
    },
  ],
  3: [
    {
      question: 'What is warehouse logistics?',
      options: ['The study of clouds', 'Managing storage and handling of goods in a warehouse', 'A type of music', 'The process of making bread'],
      correctAnswer: 'Managing storage and handling of goods in a warehouse',
    },
    {
      question: 'What is FIFO?',
      options: ['A type of dog food', 'First In, First Out - an inventory valuation method', 'A kind of bird', 'A brand of car'],
      correctAnswer: 'First In, First Out - an inventory valuation method',
    },
  ],
  4: [
    {
      question: 'What is transport logistics?',
      options: ['The study of ancient cultures', 'Optimizing transportation of goods', 'A type of sport', 'The art of painting'],
      correctAnswer: 'Optimizing transportation of goods',
    },
    {
      question: 'What is the main goal of transport logistics?',
      options: ['To waste as much time as possible', 'To move goods efficiently and cost-effectively', 'To create traffic jams', 'To pollute the environment'],
      correctAnswer: 'To move goods efficiently and cost-effectively',
    },
  ],
  5: [
    {
      question: 'What is inventory management?',
      options: ['The process of counting stars', 'Methods and techniques to efficiently manage stock levels', 'A type of dance', 'The process of making cheese'],
      correctAnswer: 'Methods and techniques to efficiently manage stock levels',
    },
    {
      question: 'What is demand forecasting?',
      options: ['Predicting the weather', 'Estimating future customer demand', 'A type of magic trick', 'The process of making wine'],
      correctAnswer: 'Estimating future customer demand',
    },
  ],
  6: [
    {
      question: 'What is international logistics?',
      options: ['The study of languages', 'Managing the flow of goods across international borders', 'A type of sport', 'The art of sculpting'],
      correctAnswer: 'Managing the flow of goods across international borders',
    },
    {
      question: 'What is customs clearance?',
      options: ['A type of toothpaste', 'The process of complying with import/export regulations', 'A brand of car', 'A style of music'],
      correctAnswer: 'The process of complying with import/export regulations',
    },
  ],
};

export default function ModulePage({params}: { params: { moduleId: string } }) {
  const {moduleId} = React.use(Promise.resolve(params));
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = quizQuestions[moduleId] || [];
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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
        Module {moduleId} <span className="text-primary">Content</span>
      </h1>

      <div className="w-full max-w-3xl">
        <Card className="mb-6 animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Video Lecture</CardTitle>
            <CardDescription className="text-sm">Watch this video to learn more about the module.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={rickRollUrl}
                title="Rick Roll Video"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-in-bottom">
          <CardHeader>
            <CardTitle className="text-xl">Mini-Test</CardTitle>
            <CardDescription className="text-sm">Test your knowledge with this short quiz.</CardDescription>
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
                  {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
                <p className="text-lg">Your Score: {score} / {questions.length}</p>
                <Button onClick={() => router.push('/modules')} className="transition-all duration-300">Back to Modules</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
