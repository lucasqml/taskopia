import { ReactNode, createContext, useContext } from "react"
import { TaskopiaAPI } from "."
import { NotImplementedTaskopiaAPI } from "./implementations/NotImplementedTaskopiaAPI"

const TaskopiaAPIContext = createContext<TaskopiaAPI>(new NotImplementedTaskopiaAPI())

export const TaskopiaAPIProvider: React.FC<{
    children?: ReactNode, taskopiaAPI: TaskopiaAPI
}> = ({
    children,
    taskopiaAPI
}) => {

        return (
            <TaskopiaAPIContext.Provider value={taskopiaAPI}>
                {children}
            </TaskopiaAPIContext.Provider>
        )
    }

export const useTaskopiaAPI = () => {
    const value = useContext(TaskopiaAPIContext)
    if (value === null || value instanceof NotImplementedTaskopiaAPI) {
        throw new Error("useTaskopiaAPI must be used within a TaskopiaAPIProvider")
    }

    return value
}