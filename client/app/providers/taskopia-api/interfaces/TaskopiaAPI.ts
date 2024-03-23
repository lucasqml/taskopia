import { Board, User } from "@/app/model";

export interface TaskopiaAPI {
    getCurrentUser(): Promise<User>;
    getCurrentBoard(): Promise<Board>;
}



