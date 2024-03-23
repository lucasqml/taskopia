"use client";

import { useTaskopiaAPI } from "@/app/providers/taskopia-api";
import { Page, PageTitle } from "@/app/types";

type HeaderProps = {
  page: Page;
};

export function Header({ page }: HeaderProps) {
  const title = PageTitle[page];

  const taskopiaAPI = useTaskopiaAPI()

  const { data: user, isLoading, error } = taskopiaAPI.currentUser()
  return (
    <header>
      <h1 className="text-4xl font-bold text-center p-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
        Taskopia! | {title}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading user: {error.message}</p>}
        {user && <p className="text-center p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"        >Welcome, {user.name}!</p>}
      </h1>
    </header>
  );
}
