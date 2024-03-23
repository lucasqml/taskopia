"use client"

import { MemoryTaskopiaAPI, TaskopiaAPIProvider } from "./taskopia-api"

export function ClientProviders({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TaskopiaAPIProvider taskopiaAPI={new MemoryTaskopiaAPI()}>
            {children}
        </TaskopiaAPIProvider>
    )
}