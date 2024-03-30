import { useEffect, useState } from "react";
import { DevTaskopiaAPI } from "..";
import { CurrentBoardProvider } from "../../interfaces";
import { QueryOf } from "@/app/types/query";
import { Board } from "@/app/types";

export function HttpBoardProvider(
  boardAPI: DevTaskopiaAPI
): CurrentBoardProvider {
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
  }, []);

  return {
    currentBoard: () => {
      return currentBoardQuery;
    },
  };
}
