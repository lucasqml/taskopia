import { User, Board } from "@/app/types";
import { TaskopiaAPI } from "..";
import { QueryOf } from "@/app/types/query";

export class NotImplementedTaskopiaAPI implements TaskopiaAPI{
    currentBoard(): QueryOf<Board> {
        throw new Error("Method not implemented.");
    }

    currentUser(): QueryOf<User> {
        throw new Error("Method not implemented.");
    }
    
}