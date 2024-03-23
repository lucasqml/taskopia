import { Board, User } from "@/app/model";
import { TaskopiaAPI } from "../interfaces/TaskopiaAPI";

export class MemoryTaskopiaAPI implements TaskopiaAPI {
    async getCurrentUser(): Promise<User> {
        return {
            id: '1',
            name: 'Lucas',
            email: 'lucas@mail.provider'
        } 
    }
    getCurrentBoard(): Promise<Board> {
        throw new Error("Method not implemented.");
    }

}
