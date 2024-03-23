import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from './providers/client-providers';

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
        <ClientProviders
        >
          {children}
        </ClientProviders>

      </body>
    </html>
  )
}
