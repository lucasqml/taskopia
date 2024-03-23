"use client";

import { useState } from "react";
import { CurrentBoardProvider } from "./interfaces/current-board-provider";
import { MemoryTaskopiaAPI } from "./implementations";
import { CurrentUserProvider } from "./interfaces";

export function MainProviders({ children }: { children: React.ReactNode }) {
  const [memoryTaskopiaAPI] = useState(() => new MemoryTaskopiaAPI());
  return (
    <CurrentBoardProvider currentBoardProvider={memoryTaskopiaAPI}>
      <CurrentUserProvider currentUserProvider={memoryTaskopiaAPI}>
        {children}
      </CurrentUserProvider>
    </CurrentBoardProvider>
  );
}
