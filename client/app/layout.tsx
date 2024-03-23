import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutWithProviders } from './providers/layout-with-providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taskopia',
  description: 'Created by @bolgheroni and @lucasqml',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWithProviders
        >
          {children}
        </LayoutWithProviders>

      </body>
    </html>
  )
}
