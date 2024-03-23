import { Header } from "./components";
import { CurrentBoard } from "./components/current-board/current-board.component";

export default function Home() {
 
  return (
    <>
      <Header page="home" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <CurrentBoard />

      </main>
    </>
  )
}
