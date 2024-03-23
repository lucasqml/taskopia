"use client"

import { MemoryTaskopiaAPI, TaskopiaAPIProvider } from "./taskopia-api"

export function LayoutWithProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TaskopiaAPIProvider taskopiaAPI={new MemoryTaskopiaAPI()}>
          {children}
        </TaskopiaAPIProvider>
      </body>
    </html>
  )
}