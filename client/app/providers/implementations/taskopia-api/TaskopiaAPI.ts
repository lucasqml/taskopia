import { Board, Task } from "@/app/types";
import { BoardAPI, UserAPI, CreateTaskInput } from "@/app/providers/interfaces";
import { AxiosInstance } from "axios";
import { GetBoardOutput, PostTaskInput, PostTaskOutput } from "./types";

export abstract class TaskopiaAPI implements BoardAPI, UserAPI {
    protected abstract _getHttpClient(): AxiosInstance

    public async getUser(id: string) {
        try {
            const response = await this._getHttpClient().get(`/user/${id}`)
            const data = response.data
            if (!data) {
                throw new Error('User not found')
            }

            return {
                id: data.id,
                name: data.name,
                email: data.email
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    public async getBoard(id: string): Promise<Board> {
        try {
            const response = await this._getHttpClient().get(`/board/${id}`)
            const data = response.data as GetBoardOutput | null

            if (!data) {
                throw new Error('Board not found')
            }

            return {
                id: data.id,
                taskLists: data.taskLists.map(taskList => {
                    return {
                        id: taskList.id,
                        title: taskList.title,
                        positionInBoard: taskList.positionInBoard,
                        tasks: taskList.tasks.map(task => {
                            return {
                                id: task.id,
                                title: task.title,
                                description: task.description,
                                tags: [],
                                dueDate: new Date(task.createdAt),
                                positionInList: task.positionInTaskList,
                                taskListId: taskList.id
                            }
                        })
                    }
                }
                )
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    public async postTask(task: CreateTaskInput): Promise<Task> {
        try {
            const input: PostTaskInput = {
                description: task.description,
                positionInTaskList: task.positionInList,
                taskList: {
                    id: task.taskListId
                },
                title: task.title
            }
            const response = await this._getHttpClient().post(`/tasks`, input)

            const data = response.data as PostTaskOutput | null
            if (!data) {
                throw new Error('Task not created')
            }

            return {
                id: data.id,
                title: data.title,
                description: data.description,
                tags: [],
                dueDate: new Date(data.createdAt),
                positionInList: data.positionInTaskList,
                taskListId: data.taskList.id
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

}