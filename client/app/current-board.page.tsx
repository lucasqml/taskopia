"use client";

import { Header, TaskList } from "@/app/components";
import { CurrentBoardProvider, useCurrentBoardProvider } from "./providers/interfaces";

type CurrentBoardPageProps = {
  provider: CurrentBoardProvider
};

export function CurrentBoardPage({
  provider
}: CurrentBoardPageProps) {
  const { data: currentBoard, isLoading, error } = provider.currentBoard();
  return (
    <>
      <Header page="home" />

      <main className="h-full flex flex-col items-center justify-between px-24 pb-6">
        <section className="flex flex-col gap-4 container h-full">
          {isLoading && <p>Loading current board...</p>}
          {error && <p>Error loading current board: {error.message}</p>}
          {!isLoading && currentBoard && (
            <>
              <h3 className="text-xl text-left py-4 bg-gradient-to-r from-blue-400 to-blue-100  text-transparent bg-clip-text font-bold ">
                {currentBoard.name}
              </h3>
              <div className="container flex flex-row gap-20 h-full">
                {currentBoard.taskLists
                  .sort((a, b) => a.positionInBoard - b.positionInBoard)
                  .map((taskList) => (
                    <TaskList key={taskList.id} taskList={taskList} />
                  ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
