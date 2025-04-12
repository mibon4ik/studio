'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/use-auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {login} = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login(username);
      router.push('/modules');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-md w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-6 animate-fade-in">
          Авторизация
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 animate-slide-in-bottom"
        >
          <Input
            type="text"
            placeholder="Логин"
            className="rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль"
            className="rounded-full shadow-sm transition-all duration-300 focus:ring-primary focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
