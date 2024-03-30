import { Board } from "@/app/types";
import { BoardAPI } from "../../interfaces/current-board-provider";
import { AxiosInstance } from "axios";
import { UserAPI } from "../../interfaces";
import { GetBoardOutput } from "./types";

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
                        name: taskList.title,
                        positionInBoard: taskList.positionInBoard,
                        tasks: taskList.tasks.map(task => {
                            return {
                                id: task.id,
                                name: task.title,
                                tags: [],
                                dueDate: new Date(task.createdAt),
                                positionInList: task.positionInTaskList
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

}
