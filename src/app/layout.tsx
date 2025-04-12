import type {Metadata} from 'next';
import Link from 'next/link';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {SidebarProvider} from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Логистика Ace',
  description: 'Изучите основы логистики с помощью этой интерактивной обучающей платформы.',
  // Add other meta tags for better SEO
  // Example:
  // viewport: 'width=device-width, initial-scale=1',
  // Open Graph / Facebook
  // openGraph: {
  //   title: 'Logistics Ace',
  //   description: 'Learn logistics basics',
  //   url: 'https://yourwebsite.com',
  //   siteName: 'Logistics Ace',
  //   images: [
  //     {
  //       url: 'https://yourwebsite.com/og.png', // Replace with your image
  //       width: 800,
  //       height: 600,
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <SidebarProvider>
          <div className="flex flex-col min-h-screen">
            <nav className="bg-secondary text-secondary-foreground p-4">
              <ul className="flex justify-center space-x-6 md:space-x-8 lg:space-x-10">
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
              </ul>
            </nav>
            <main className="flex-1">{children}</main>
            <footer className="bg-secondary text-secondary-foreground p-4 text-center">
              <p>&copy; {new Date().getFullYear()} Логистика Ace. Все права защищены.</p>
            </footer>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
