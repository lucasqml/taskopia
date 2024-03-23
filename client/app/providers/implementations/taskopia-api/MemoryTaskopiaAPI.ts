import { Board, User } from "@/app/types";
import { QueryOf } from "@/app/types/query";
import { CurrentBoardProvider } from "../../interfaces/current-board-provider";
import { CurrentUserProvider } from "../../interfaces/current-user-provider";

export class MemoryTaskopiaAPI implements CurrentBoardProvider, CurrentUserProvider {
    private _currentUser: User;
    private _currentBoard: Board;

    public constructor() {
        this._currentUser = {
            id: '1',
            name: 'Lucas',
            email: 'lucas@mail.provider'
        }

        this._currentBoard = {
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


    currentUser(): QueryOf<User> {
        return {
            data: this._currentUser,
            error: null,
            isLoading: false
        }
    }
    currentBoard(): QueryOf<Board> {
        return {
            data: this._currentBoard,
            error: null,
            isLoading: false
        }
    }

}
