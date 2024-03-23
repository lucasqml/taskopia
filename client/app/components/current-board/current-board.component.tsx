"use client";

import { useTaskopiaAPI } from "@/app/providers/taskopia-api";
import { Board } from "@/app/types";
import { useEffect, useState } from "react";

export function CurrentBoard() {
  const api = useTaskopiaAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  useEffect(() => {
    async function fetchCurrentBoard() {
      setIsLoading(true);
      try {
        const board = await api.getCurrentBoard();
        setCurrentBoard(board);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchCurrentBoard();
  }, []);

  return (
    <section className="flex flex-col gap-4 container">
      <h2 className="text-2xl">Current Board</h2>
      {isLoading && <p>Loading current board...</p>}
      {currentBoard && (
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
