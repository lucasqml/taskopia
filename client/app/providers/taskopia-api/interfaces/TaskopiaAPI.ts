import { Board, User } from "@/app/types";

export interface TaskopiaAPI {
    getCurrentUser(): Promise<User>;
    getCurrentBoard(): Promise<Board>;
}



