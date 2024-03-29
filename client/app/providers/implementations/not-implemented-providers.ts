import { QueryOf } from "@/app/types/query";
import { Board, User } from "@/app/types";
import { CurrentUserProvider } from "../interfaces/current-user-provider";
import { CurrentBoardProvider } from "../interfaces/current-board-provider";

export class NotImplementedCurrentBoardProvider implements CurrentBoardProvider {
    currentBoard(): QueryOf<Board> {
        throw new Error("Method not implemented.");
    }
}

export class NotImplementedCurrentUserProvider implements CurrentUserProvider {
    currentUser(): QueryOf<User> {
        throw new Error("Method not implemented.");
    }
}