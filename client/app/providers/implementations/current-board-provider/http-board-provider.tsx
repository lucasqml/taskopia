import { useEffect, useState } from "react";
import { TaskopiaAPI } from "..";
import {
  CreateListInput,
  CreateTaskInput,
  CurrentBoardProvider,
  CurrentUserProvider,
  DeleteTaskInput,
  EditListInput,
  EditTaskInput,
  MoveTaskInput,
} from "../../interfaces";
import { QueryOf } from "@/app/types/query";
import { Board, Task, TaskList } from "@/app/types";
import { BoardProviderActionsHandler } from "./board-provider-actions-handler";

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

  const { addActionToQueue } = BoardProviderActionsHandler({
    boardAPI,
    currentBoardQuery,
    setBoardQueryState: setCurrentBoardQuery,
  });

  useEffect(() => {
    async function fetchCurrentBoard(currentUserId: string) {
      try {
        setCurrentBoardQuery({
          isLoading: true,
          data: undefined,
          error: undefined,
        });

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

  // optimistic update: add the task to the board before the server responds, then update the task with the server response
  const optimisticAddTask = async (task: CreateTaskInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const newTask: Task = {
      // generate fake id
      id: "fake" + Math.random().toString(36).substring(7),
      title: task.title,
      description: task.description,
      tags: [],
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
      }),
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: "ADD_TASK",
      actionResult: newTask,
      actionInput: task,
    });
  };

  const optimisticEditTask = async (task: EditTaskInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const currentTask = currentBoardQuery.data.taskLists
      .flatMap((taskList) => taskList.tasks)
      .find((t) => t.id === task.id);
    if (!currentTask) {
      throw new Error("Task not found");
    }

    const updatedTask: Task = {
      ...currentTask,
      title: task.title,
      description: task.description,
    };

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: currentBoardQuery.data.taskLists.map((taskList) => {
        return {
          ...taskList,
          tasks: taskList.tasks.map((t) => {
            if (t.id === task.id) {
              return updatedTask;
            }
            return t;
          }),
        };
      }),
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: "EDIT_TASK",
      actionResult: updatedTask,
      actionInput: task,
    });
  };

  const optimisticMoveTask = async (task: MoveTaskInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const currentTask = currentBoardQuery.data.taskLists
      .flatMap((taskList) => taskList.tasks)
      .find((t) => t.id === task.taskId);
    if (!currentTask) {
      throw new Error("Task not found");
    }

    const oldList = currentBoardQuery.data.taskLists.find(
      (tl) => tl.id === task.originTaskListId
    );

    const targetList = currentBoardQuery.data.taskLists.find(
      (tl) => tl.id === task.destinationTaskListId
    );

    const updatedTask: Task = {
      ...currentTask,
      taskListId: task.destinationTaskListId,
    };

    if (!oldList || !targetList) {
      throw new Error("Task list not found");
    }

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: currentBoardQuery.data.taskLists.map((taskList) => {
        if (taskList.id === task.originTaskListId) {
          return {
            ...taskList,
            tasks: taskList.tasks.filter((t) => t.id !== task.taskId),
          };
        }
        if (taskList.id === task.destinationTaskListId) {
          return {
            ...taskList,
            tasks: [...taskList.tasks, updatedTask],
          };
        }
        return taskList;
      }),
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: "MOVE_TASK",
      actionResult: updatedTask,
      actionInput: task,
    });
  };

  const optimisticDeleteTask = async (input: DeleteTaskInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: currentBoardQuery.data.taskLists.map((taskList) => {
        return {
          ...taskList,
          tasks: taskList.tasks.filter((t) => t.id !== input.taskId),
        };
      }),
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: "DELETE_TASK",
      actionInput: input,
    });
  };

  const optimisticCreateList = async (input: CreateListInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const newTaskList = {
      id: "fake" + Math.random().toString(36).substring(7),
      title: input.title,
      positionInBoard: currentBoardQuery.data.taskLists.length,
      tasks: [],
    };

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: [...currentBoardQuery.data.taskLists, newTaskList],
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: "CREATE_LIST",
      actionResult: newTaskList,
      actionInput: input,
    });
  };

  const optimisticEditList = async (input: EditListInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }
    const currentList = currentBoardQuery.data.taskLists.find(
      (taskList) => taskList.id === input.taskListId
    );

    if (!currentList) {
      throw new Error("Task list not found. Update Failed");
    }
    const updatedList: TaskList = {
      ...currentList,
      title: input.title,
    };

    const newBoard: Board = {
      ...currentBoardQuery.data,
      taskLists: currentBoardQuery.data.taskLists.map((list) => {
        if (list.id == input.taskListId) {
          return updatedList;
        }
        return list;
      }),
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });

    addActionToQueue({
      type: 'EDIT_LIST',
      actionInput: input,
      actionResult: updatedList
      
    });
  };

  return {
    currentBoard: () => {
      return currentBoardQuery;
    },
    createTask: optimisticAddTask,
    editTask: optimisticEditTask,
    moveTask: optimisticMoveTask,
    deleteTask: optimisticDeleteTask,
    createList: optimisticCreateList,
    editList: optimisticEditList
  };
}
