import { User } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { NotImplementedCurrentUserProvider } from "../implementations/not-implemented-providers";

export interface CurrentUserProvider {
  currentUser(): QueryOf<User>;
}

export interface UserAPI {
  getUser(userId: string): Promise<User>;
}

const CurrentUserContext = createContext<CurrentUserProvider>(
  new NotImplementedCurrentUserProvider()
);

export const CurrentUserProvider: React.FC<{
  children?: ReactNode;
  userAPI: UserAPI;
}> = ({ children, userAPI }) => {
  const [currentUserQuery, setCurrentUserQuery] = useState<QueryOf<User>>({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await userAPI.getUser('1');
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
  }, [])


  return (
    <CurrentUserContext.Provider value={{
      currentUser: () => currentUserQuery,
    }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserProvider = () => {
  const value = useContext(CurrentUserContext);
  if (value === null || value instanceof NotImplementedCurrentUserProvider) {
    throw new Error(
      "useCurrentUserProvider must be used within a CurrentUserProvider"
    );
  }

  return value;
};
