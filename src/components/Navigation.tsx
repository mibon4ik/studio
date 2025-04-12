'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import React from 'react';
import {useAuth} from "@/hooks/use-auth";

export default function Navigation() {
  const {user, logout} = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-secondary text-secondary-foreground p-4">
      <ul className="flex justify-center space-x-6 md:space-x-8 lg:space-x-10 relative left-0 right-0 mx-auto">
        <li>
          <Link href="/" className="hover:text-primary transition-colors duration-300">
            Главная
          </Link>
        </li>
        <li>
          <Link href="/modules" className="hover:text-primary transition-colors duration-300">
            Модули
          </Link>
        </li>
        <li>
          <Link href="/dictionary" className="hover:text-primary transition-colors duration-300">
            Словарь
          </Link>
        </li>
        <li>
          <Link href="/contacts" className="hover:text-primary transition-colors duration-300">
            Контакты
          </Link>
        </li>
        {user ? (
          <li>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Выйти ({user})
            </Button>
          </li>
        ) : (
          <li>
            <Link href="/login" className="hover:text-primary transition-colors duration-300">
              Войти
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

