import { useEffect, useState } from "react";
import { TaskopiaAPI } from "..";
import { CurrentBoardProvider, CurrentUserProvider } from "../../interfaces";
import { QueryOf } from "@/app/types/query";
import { Board } from "@/app/types";

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

  return {
    currentBoard: () => {
      return currentBoardQuery;
    },
  };
}
