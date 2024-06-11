import { Board, Task, TaskList } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { NotImplementedCurrentBoardProvider } from "../implementations/not-implemented-providers";

export interface BoardAPI {
  getBoard(id: string): Promise<Board>;
  postTask(task: CreateTaskInput): Promise<Task>;
  putTask(task: EditTaskInput): Promise<Task>;
  moveTask(task: MoveTaskInput): Promise<Task>;
  deleteTask(task: DeleteTaskInput): Promise<void>;
  postList(input: CreateListInput): Promise<TaskList>;
  putList(input: EditListInput): Promise<Partial<TaskList>>;
}

export type CreateTaskInput = {
  title: string;
  description: string;
  taskListId: string;
  positionInList: number;
}

export type EditTaskInput = {
  id: string;
  title: string;
  description: string;
}

export type MoveTaskInput = {
  taskId: string;
  originTaskListId: string;
  destinationTaskListId: string;
  positionInList: number;
}

export type DeleteTaskInput = {
  taskId: string;
}

export type CreateListInput = {
  title: string;
  positionInBoard: number;
  boardId: string;
}

export type EditListInput = {
  taskListId: string;
  title: string
}

export interface CurrentBoardProvider {
  currentBoard(): QueryOf<Board>;
  createTask(input: CreateTaskInput): Promise<void>;
  editTask(input: EditTaskInput): Promise<void>;
  moveTask(input: MoveTaskInput): Promise<void>;
  deleteTask(input: DeleteTaskInput): Promise<void>;
  createList(input: CreateListInput): Promise<void>;
  editList(input: EditListInput): Promise<void>;
}

const CurrentBoardContext = createContext<CurrentBoardProvider>(
  new NotImplementedCurrentBoardProvider()
);

export const CurrentBoardProvider: React.FC<{
  children?: ReactNode;
  currentBoardProvider: CurrentBoardProvider;
}> = ({ children, currentBoardProvider }) => {
  return (
    <CurrentBoardContext.Provider value={currentBoardProvider}>
      {children}
    </CurrentBoardContext.Provider>
  );
};

export const useCurrentBoardProvider = () => {
  const value = useContext(CurrentBoardContext);
  if (value === null || value instanceof NotImplementedCurrentBoardProvider) {
    throw new Error(
      "useCurrentBoardProvider must be used within a CurrentBoardProvider"
    );
  }

  return value;
};
