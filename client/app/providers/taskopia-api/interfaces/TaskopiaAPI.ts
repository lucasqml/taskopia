import { Board, User } from "@/app/types";
import { QueryOf } from "@/app/types/query";

export interface TaskopiaAPI {
    currentUser(): QueryOf<User>;
    currentBoard(): QueryOf<Board>;
}



