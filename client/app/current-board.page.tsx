"use client";

import { Header, TaskList } from "@/app/components";
import { CreateTaskInput, CurrentBoardProvider, EditTaskInput, useCurrentBoardProvider } from "./providers/interfaces";

type CurrentBoardPageProps = {
  provider: CurrentBoardProvider
};

export function CurrentBoardPage({
  provider
}: CurrentBoardPageProps) {
  const { data: currentBoard, isLoading, error } = provider.currentBoard();

  const onAddTask = (task: CreateTaskInput) => provider.createTask(task);

  const onEditTask = (task: EditTaskInput) => provider.editTask(task);
  return (
    <>
      <Header page="home" />

      <main className="h-full flex flex-col items-center justify-between px-12 mt-6 pb-6 min-h-0">
        <section className="flex flex-col gap-4 container h-full">
          {isLoading && <p>Loading current board...</p>}
          {error && <p>Error loading current board: {error.message}</p>}
          {!isLoading && currentBoard && (
            <>
              <div className="container flex flex-row gap-5 h-full">
                {currentBoard.taskLists
                  .sort((a, b) => a.positionInBoard - b.positionInBoard)
                  .map((taskList) => (
                    <TaskList key={taskList.id} taskList={taskList} onAddTask={onAddTask} onEditTask={onEditTask} />
                  ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
