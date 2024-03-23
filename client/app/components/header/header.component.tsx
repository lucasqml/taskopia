import { useTaskopiaAPI } from "@/app/providers/taskopia-api";
import { Page, PageTitle, User } from "@/app/types";
import { useEffect, useState } from "react";

type HeaderProps = {
  page: Page;
};

export function Header({ page }: HeaderProps) {
  const title = PageTitle[page];

  const taskopiaAPI = useTaskopiaAPI()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true)
      try {
        const user = await taskopiaAPI.getCurrentUser()
        setUser(user)
      } catch (error) {
        console.error(error)
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [])


  return (
    <header>
      <h1 className="text-4xl font-bold text-center p-8 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
        Taskopia! | {title}
        {isLoading && <p>Loading...</p>}
        {user && <p className="text-center p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"        >Welcome, {user.name}!</p>}
      </h1>
    </header>
  );
}
