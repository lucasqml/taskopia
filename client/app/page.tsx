"use client";

import { CurrentBoardPage } from "./current-board.page";
import { useCurrentBoardProvider } from "./providers/interfaces";

export default function Home() {
  
  return <CurrentBoardPage
    provider={useCurrentBoardProvider()}
  />;
}
