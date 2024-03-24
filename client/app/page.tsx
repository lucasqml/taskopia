import { Header } from "./components";
import { CurrentBoard } from "./current-board.component";

export default function Home() {
 
  return (
    <>
      <Header page="home" />

      <main className="h-full flex flex-col items-center justify-between px-24 pb-6">

        <CurrentBoard />

      </main>
    </>
  )
}
