import { Board } from "@/app/types";
import { BoardAPI } from "../../interfaces/current-board-provider";
import axios, { AxiosInstance } from "axios";
import { UserAPI } from "../../interfaces";
import { GetBoardOutput } from "./types";

export class DevTaskopiaAPI implements BoardAPI, UserAPI {
    private _httpClient: AxiosInstance

    public constructor() {
        this._httpClient = axios.create({
            baseURL: 'http://localhost:8080/api',
            timeout: 1000,
            headers: {

            }
        })

    }

    public async getUser() {
        return {
            id: '1',
            name: 'Paulo Miranda',
            email: 'pauloMiranda@gmail.com'
        }
    }

    public async getBoard(): Promise<Board> {
        try {
            const response = await this._httpClient.get(`/board/1`)
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
