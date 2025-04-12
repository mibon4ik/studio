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
  title: 'Logistics Ace',
  description: 'Learn the basics of logistics with this interactive learning platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <SidebarProvider>
          <div className="flex flex-col min-h-screen">
            <nav className="bg-secondary text-secondary-foreground p-4">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/modules" className="hover:text-primary">
                    Modules
                  </Link>
                </li>
                <li>
                  <Link href="/dictionary" className="hover:text-primary">
                    Dictionary
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
