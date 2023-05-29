import Navigation from './Navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
const inter = Inter({ subsets: ['latin'] });
import { DisclaimerProvider, useDisclaimerContext } from './DisclaimerProvider';

export const metadata = {
  title: 'Y2K Chinese-language Web Showcase / 千禧年中文网页展示',
  description: 'Y2K Chinese-language Web Showcase / 千禧年中文网页展示',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'min-h-screen')}>
        <DisclaimerProvider>
          <Navigation />
          <main className='flex h-full flex-col items-center justify-between'>
            {children}
          </main>
        </DisclaimerProvider>
      </body>
    </html>
  );
}
