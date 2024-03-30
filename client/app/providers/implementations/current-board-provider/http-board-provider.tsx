import { useEffect, useState } from "react";
import { TaskopiaAPI } from "..";
import { CreateTaskInput, CurrentBoardProvider, CurrentUserProvider } from "../../interfaces";
import { QueryOf } from "@/app/types/query";
import { Board, Task } from "@/app/types";

type AddTaskAction = {
  type: "ADD_TASK";
  actionResult: Task
  actionInput: CreateTaskInput 
}

type BoardAction = AddTaskAction

export function HttpBoardProvider(
  boardAPI: TaskopiaAPI,
  currentUserProvider: CurrentUserProvider
): CurrentBoardProvider {
  const [currentBoardQuery, setCurrentBoardQuery] = useState<QueryOf<Board>>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  const [actionsQueue, setActionsQueue] = useState<BoardAction[]>([])

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

  // optimistic update: add the task to the board before the server responds, then update the task with the server response
  const optimisticAddTask = async (task: CreateTaskInput) => {
    if (!currentBoardQuery.data) {
      throw new Error("No board loaded");
    }

    const newTask: Task = {
      // generate fake id
      id: Math.random().toString(36).substring(7),
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
      }) 
    };

    setCurrentBoardQuery({
      isLoading: false,
      data: newBoard,
      error: null,
    });


    const action: AddTaskAction = {
      type: "ADD_TASK",
      actionResult: newTask,
      actionInput: task
    }
    setActionsQueue([
      ...actionsQueue,
      action
    ])
  }

  async function processAddTaskAction(action: AddTaskAction) {
    // actually send the request to the server
    try {
      const task = action.actionInput
      const optimisticTask = action.actionResult
      const createdTask = await boardAPI.postTask(task);
      if (!currentBoardQuery.data){
        throw new Error("No board loaded");
      }
      const board: Board = currentBoardQuery.data
  
      // update the task with the server response
      const updatedBoard = {
        ...currentBoardQuery.data,
        taskLists: board.taskLists.map((taskList) => {
          if (taskList.id === task.taskListId) {
            return {
              ...taskList,
              tasks: taskList.tasks.map((task) => {
                if (task.id === optimisticTask.id) {
                  return createdTask;
                }
                return task;
              }),
            };
          }
          return taskList;
        }),
      };
  
      setCurrentBoardQuery({
        isLoading: false,
        data: updatedBoard,
        error: null,
      });
    } catch (error: any) {
      // TODO rollback the optimistic update
      setCurrentBoardQuery({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  }

  // where the actions are actually sent to the server
  useEffect(() => {
    async function processActions() {
      if (actionsQueue.length === 0) return

      const action = actionsQueue[0]
      switch (action.type) {
        case "ADD_TASK":
          await processAddTaskAction(action)
          break
      }

      setActionsQueue(actionsQueue.slice(1))
    }

    processActions()
  })

  return {
    currentBoard: () => {
      return currentBoardQuery;
    },
    createTask: optimisticAddTask
  };
}
