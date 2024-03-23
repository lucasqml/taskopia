import { User } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { ReactNode, createContext, useContext } from "react";
import { NotImplementedCurrentUserProvider } from "../implementations/not-implemented-providers";

export interface CurrentUserProvider {
  currentUser(): QueryOf<User>;
}

const CurrentUserContext = createContext<CurrentUserProvider>(
  new NotImplementedCurrentUserProvider()
);

export const CurrentUserProvider: React.FC<{
  children?: ReactNode;
  currentUserProvider: CurrentUserProvider;
}> = ({ children, currentUserProvider }) => {
  return (
    <CurrentUserContext.Provider value={currentUserProvider}>
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
