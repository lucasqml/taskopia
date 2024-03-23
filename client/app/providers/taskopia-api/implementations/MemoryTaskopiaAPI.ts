import { Board, User } from "@/app/types";
import { TaskopiaAPI } from "../interfaces/TaskopiaAPI";
import { QueryOf } from "@/app/types/query";

export class MemoryTaskopiaAPI implements TaskopiaAPI {
    currentUser(): QueryOf<User> {
        const data = {
            id: '1',
            name: 'Lucas',
            email: 'lucas@mail.provider'
        } 
        return {
            data,
            error: null,
            isLoading: false
        }
    }
    currentBoard(): QueryOf<Board> {
        const data = {
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
        return {
            data,
            error: null,
            isLoading: false
        }
    }

}
