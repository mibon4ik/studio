'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !message) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    console.log('Отправка:', {name, email, message});

    setName('');
    setEmail('');
    setMessage('');

    alert('Сообщение успешно отправлено!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-8 animate-fade-in">
        Связаться <span className="text-primary">Со Мной</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full md:w-1/2 animate-slide-in-bottom"
      >
        <Input
          type="text"
          placeholder="Ваше Имя"
          className="rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Ваш Email"
          className="rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          placeholder="Ваше Сообщение"
          className="rounded-md shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Отправить Сообщение
        </Button>
      </form>
    </div>
  );
}
