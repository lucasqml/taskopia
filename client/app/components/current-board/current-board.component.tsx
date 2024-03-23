"use client";

import { useTaskopiaAPI } from "@/app/providers/taskopia-api";

export function CurrentBoard() {
  const api = useTaskopiaAPI();
  const {
    data: currentBoard,
    isLoading,
    error,
  } = api.currentBoard();

  return (
    <section className="flex flex-col gap-4 container">
      <h2 className="text-2xl">Current Board</h2>
      {isLoading && <p>Loading current board...</p>}
      {error && <p>Error loading current board: {error.message}</p>}
      {!isLoading && currentBoard && (
        <>
          <h3 className="text-xl"
          >{currentBoard.name}</h3>
          <div className="container flex flex-row gap-1">
            {currentBoard.taskLists
              .sort((a, b) => a.positionInBoard - b.positionInBoard)
              .map((taskList) => (
                <section key={taskList.id} className="flex flex-col w-1/3 gap-2">
                  <h3>{taskList.name}</h3>
                  <ul>
                    {taskList.tasks
                      .sort((a, b) => a.positionInList - b.positionInList)
                      .map((task) => (
                        <li key={task.id}>
                          <p>{task.name}</p>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
