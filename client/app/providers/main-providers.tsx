"use client";

import { useState } from "react";
import { CurrentBoardProvider } from "./interfaces/current-board-provider";
import { DevTaskopiaAPI } from "./implementations";
import { CurrentUserProvider } from "./interfaces";

export function MainProviders({ children }: { children: React.ReactNode }) {
  const [devTaskopiaAPI] = useState(() => new DevTaskopiaAPI());
  return (
    <CurrentBoardProvider boardAPI={devTaskopiaAPI}>
      <CurrentUserProvider userAPI={devTaskopiaAPI}>
        {children}
      </CurrentUserProvider>
    </CurrentBoardProvider>
  );
}
