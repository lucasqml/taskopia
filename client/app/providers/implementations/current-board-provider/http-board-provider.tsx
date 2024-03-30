import { useEffect, useState } from "react";
import { TaskopiaAPI } from "..";
import { CreateTaskInput, CurrentBoardProvider, CurrentUserProvider } from "../../interfaces";
import { QueryOf } from "@/app/types/query";
import { Board, Task } from "@/app/types";

export function HttpBoardProvider(
  boardAPI: TaskopiaAPI,
  currentUserProvider: CurrentUserProvider
): CurrentBoardProvider {
  const [currentBoardQuery, setCurrentBoardQuery] = useState<QueryOf<Board>>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  const currentUser = currentUserProvider.currentUser().data;

  useEffect(() => {
    async function fetchCurrentBoard(
      currentUserId: string
    ) {
      try {
        setCurrentBoardQuery({
          isLoading: true,
          data: undefined,
          error: undefined
        })

        const board = await boardAPI.getBoard(currentUserId);
        setCurrentBoardQuery({
          isLoading: false,
          data: board,
          error: null,
        });
      } catch (error: any) {
        setCurrentBoardQuery({
          isLoading: false,
          data: undefined,
          error: error,
        });
      }
    }

    if (currentUser) fetchCurrentBoard(currentUser.id);
  }, [currentUser?.id]);

  const onAddTask = async (task: CreateTaskInput) => {
    if (!currentBoardQuery.data) return;
    const newTask: Task = {
      id: "123",
      name: task.title,
      description: task.description,
      tags: task.tags,
      taskListId: task.taskListId,
      positionInList: task.positionInList,
    };

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: currentBoardQuery.data?.taskLists.map((taskList) => {
        if (taskList.id === task.taskListId) {
          return {
            ...taskList,
            tasks: [...taskList.tasks, newTask],
          };
        }
        return taskList;
      }) 
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });
  }

  return {
    currentBoard: () => {
      return currentBoardQuery;
    },
    createTask: onAddTask
  };
}
