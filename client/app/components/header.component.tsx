"use client";

import { useCurrentUserProvider } from "@/app/providers/interfaces";
import { Page, PageTitle } from "@/app/types";

type HeaderProps = {
  page: Page;
};

export function Header({ page }: HeaderProps) {
  const title = PageTitle[page];

  const userProvider = useCurrentUserProvider();

  const { data: user, isLoading, error } = userProvider.currentUser();
  return (
    <header className="relative">
      <span className="absolute top-2 left-2 px-1 text-blue-300 bg-blue-700 bg-opacity-50 rounded">
        {title}
      </span>
      <h1 className="text-4xl font-bold text-center pt-8 bg-gradient-to-r from-blue-100 to-blue-700 text-transparent bg-clip-text">
        Taskopia!
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading user: {error.message}</p>}
        {user && (
          <p className="text-center pt-4 bg-gradient-to-r from-blue-700 to-blue-100  text-transparent bg-clip-text text-sm">
            Welcome, {user.name}!
          </p>
        )}
      </h1>
    </header>
  );
}
