import { Board } from "@/app/types";
import { BoardAPI } from "../../interfaces/current-board-provider";
import axios, { AxiosInstance } from "axios";
import { UserAPI } from "../../interfaces";

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

    public async getBoard() {
        try {
            const response = await this._httpClient.get(`/board/1`)
            const data = response.data;

            if (!data) {
                throw new Error('Board not found')
            }

            return data as Board

        } catch (error: any) {
            throw new Error(error)
        }
    }

}
