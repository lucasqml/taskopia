import { Board, User } from "@/app/types";
import { TaskopiaAPI } from "../interfaces/TaskopiaAPI";

export class MemoryTaskopiaAPI implements TaskopiaAPI {
    async getCurrentUser(): Promise<User> {
        return {
            id: '1',
            name: 'Lucas',
            email: 'lucas@mail.provider'
        } 
    }
    async getCurrentBoard(): Promise<Board> {
        return {
            id: '1',
            name: 'My Default Board',
            taskLists: [
                {
                    id: '1',
                    name: 'To Do',
                    positionInBoard: 1,
                    tasks: []
                },
                {
                    id: '2',
                    name: 'Doing',
                    positionInBoard: 2,
                    tasks: []
                },
                {
                    id: '3',
                    name: 'Done',
                    positionInBoard: 3,
                    tasks: []
                }
            ]
        }
    }

}
