"use client";

import { useState } from "react";
import { CurrentBoardProvider } from "./interfaces/current-board-provider";
import { DevTaskopiaAPI, HttpBoardProvider, HttpUserProvider } from "./implementations";
import { CurrentUserProvider } from "./interfaces";

export function MainProviders({ children }: { children: React.ReactNode }) {
  const [devTaskopiaAPI] = useState(() => new DevTaskopiaAPI());
  const httpUserProvider = HttpUserProvider(devTaskopiaAPI);
  const httpBoardProvider = HttpBoardProvider(devTaskopiaAPI);
  
  return (
    <CurrentBoardProvider currentBoardProvider={httpBoardProvider}>
      <CurrentUserProvider currentUserProvider={httpUserProvider}>
        {children}
      </CurrentUserProvider>
    </CurrentBoardProvider>
  );
}
