import { Board } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { NotImplementedCurrentBoardProvider } from "../implementations/not-implemented-providers";

export interface BoardAPI {
  getBoard(id: string): Promise<Board>;
}

export interface CurrentBoardProvider {
  currentBoard(): QueryOf<Board>;
}

const CurrentBoardContext = createContext<CurrentBoardProvider>(
  new NotImplementedCurrentBoardProvider()
);

export const CurrentBoardProvider: React.FC<{
  children?: ReactNode;
  boardAPI: BoardAPI;
}> = ({ children, boardAPI }) => {
  const [currentBoardQuery, setCurrentBoardQuery] = useState<QueryOf<Board>>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    async function fetchCurrentBoard() {
      try {
        const board = await boardAPI.getBoard("1");
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
    
    fetchCurrentBoard();
  }, [])

  return (
    <CurrentBoardContext.Provider value={{
      currentBoard: () => currentBoardQuery,
    }}>
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
