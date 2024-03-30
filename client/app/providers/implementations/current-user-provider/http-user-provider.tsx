import { User } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { useEffect, useState } from "react";
import { CurrentUserProvider } from "../../interfaces";
import { TaskopiaAPI } from "..";

export function HttpUserProvider(userAPI: TaskopiaAPI): CurrentUserProvider {
  const [currentUserQuery, setCurrentUserQuery] = useState<QueryOf<User>>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        // TODO: get user from cookie
        const user = await userAPI.getUser("1");
        setCurrentUserQuery({
          isLoading: false,
          data: user,
          error: null,
        });
      } catch (error: any) {
        setCurrentUserQuery({
          isLoading: false,
          data: undefined,
          error: error,
        });
      }
    }

    fetchCurrentUser();
  }, []);

  return {
    currentUser: () => {
      return currentUserQuery;
    },
  };
}
