'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useState} from 'react';

import styles from './quiz.module.css';

interface QuizProps {
  questions: any[];
  moduleId: number;
  onCompleteModule: () => void;
}

const Quiz: React.FC<QuizProps> = ({questions, moduleId, onCompleteModule}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

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
    <Card className={styles.quizCard}>
      <CardHeader>
        <CardTitle className="text-xl">Мини-Тест</CardTitle>
        <CardDescription className="text-sm">Проверьте свои знания с помощью этого короткого теста.</CardDescription>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <div className={styles.quizContent}>
            <h2 className={styles.questionTitle}>{currentQuestion?.question}</h2>
            <ul className={styles.optionsList}>
              {currentQuestion?.options.map((option, index) => (
                <li key={index} className={styles.optionItem}>
                  <label className={styles.optionLabel}>
                    <Input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                      className={styles.optionInput}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswer} className={styles.nextButton}>
              {currentQuestionIndex === questions.length - 1 ? 'Завершить Тест' : 'Следующий Вопрос'}
            </Button>
          </div>
        ) : (
          <div className={styles.quizComplete}>
            <h3 className="text-xl font-semibold mb-4">Тест Завершен!</h3>
            <p className="text-lg">Ваш Счет: {score} / {questions.length}</p>
            <Button onClick={onCompleteModule} className={styles.completeButton}>
              Перейти к следующему модулю
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
