import axios, { AxiosInstance } from "axios";
import { TaskopiaAPI } from "./TaskopiaAPI";

export class DevTaskopiaAPI extends TaskopiaAPI {
    private _httpClient: AxiosInstance

    public constructor() {
        super()
        this._httpClient = axios.create({
            baseURL: 'http://localhost:8080/api',
            timeout: 1000,
            headers: {
            }
        })

    }

    protected _getHttpClient(): AxiosInstance {
        return this._httpClient
    }


}
