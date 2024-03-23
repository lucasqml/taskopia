import type { Metadata } from 'next';
import './globals.css';
import { MainProviders } from './providers/main-providers';

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
      <body>
        <MainProviders
        >
          {children}
        </MainProviders>

      </body>
    </html>
  )
}
