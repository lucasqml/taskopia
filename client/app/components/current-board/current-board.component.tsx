"use client";

import { useCurrentBoardProvider } from "@/app/providers/interfaces";

export function CurrentBoard() {
  const boardProvider = useCurrentBoardProvider();
  const { data: currentBoard, isLoading, error } = boardProvider.currentBoard();

  return (
    <section className="flex flex-col gap-4 container h-full">
      {isLoading && <p>Loading current board...</p>}
      {error && <p>Error loading current board: {error.message}</p>}
      {!isLoading && currentBoard && (
        <>
          <h3 
            className="text-xl text-left py-4 bg-gradient-to-r from-blue-400 to-blue-100  text-transparent bg-clip-text font-bold "
          >{currentBoard.name}</h3>
          <div className="container flex flex-row gap-20 h-full">
            {currentBoard.taskLists
              .sort((a, b) => a.positionInBoard - b.positionInBoard)
              .map((taskList) => (
                <section
                  key={taskList.id}
                  className="flex flex-col w-1/3 gap-6 bg-blue-400 p-4 rounded h-full"
                >
                  <h3 className="text-lg text-left text-white font-bold">
                    {taskList.name}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {taskList.tasks
                      .sort((a, b) => a.positionInList - b.positionInList)
                      .map((task) => (
                        <li
                          key={task.id}
                          className="
                          flex flex-col justify-between gap-1 min-h-20 bg-gray-100 p-2 pt-3 rounded 
                        "
                        >
                          <h4 className="text-cyan-600">{task.name}</h4>
                          <div className="flex flex-row gap-1">
                            {task.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="bg-gray-300 px-1 py-0 rounded text-xs text-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
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
