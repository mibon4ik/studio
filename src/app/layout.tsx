import type {Metadata} from 'next';
import Link from 'next/link';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {SidebarProvider} from '@/components/ui/sidebar';
import {AuthProvider} from '@/hooks/use-auth';
import React from 'react';
import Navigation from "@/components/Navigation";

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



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Toaster />
          <SidebarProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">{children}</main>
              <footer className="bg-secondary text-secondary-foreground p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Логистика Ace. Все права защищены.</p>
              </footer>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
