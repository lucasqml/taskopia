import { Board } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { NotImplementedCurrentBoardProvider } from "../implementations/not-implemented-providers";

export interface BoardAPI {
  getBoard(id: string): Promise<Board>;
}

export type CreateTaskInput = {
  title: string;
  description: string;
  tags: string[];
  taskListId: string;
  positionInList: number;
}

export interface CurrentBoardProvider {
  currentBoard(): QueryOf<Board>;
  createTask(task: CreateTaskInput): Promise<void>;
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
