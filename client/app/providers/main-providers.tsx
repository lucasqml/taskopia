"use client";

import { useState } from "react";
import { CurrentBoardProvider } from "./interfaces/current-board-provider";
import { DevTaskopiaAPI, HttpBoardProvider, MemoryUserProvider } from "./implementations";
import { CurrentUserProvider } from "./interfaces";

export function MainProviders({ children }: { children: React.ReactNode }) {
  // TODO use factory?
  const [taskopiaAPI] = useState(() => new DevTaskopiaAPI());
  const userProvider = MemoryUserProvider();
  const boardProvider = HttpBoardProvider(taskopiaAPI);

  return (
    <CurrentBoardProvider currentBoardProvider={boardProvider}>
      <CurrentUserProvider currentUserProvider={userProvider}>
        {children}
      </CurrentUserProvider>
    </CurrentBoardProvider>
  );
}
