import { User } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { useState } from "react";
import { CurrentUserProvider } from "../../interfaces";

export function MemoryUserProvider(): CurrentUserProvider {
  const [currentUserQuery] = useState<QueryOf<User>>({
    isLoading: false,
    data: {
        email: "paulo.miranda@provider.mail",
        id: "1",
        name: "Paulo Miranda",
    },
    error: null
  });

  return {
    currentUser: () => {
      return currentUserQuery;
    },
  };
}
