import { User, Board } from "@/app/model";
import { TaskopiaAPI } from "..";

export class NotImplementedTaskopiaAPI implements TaskopiaAPI{
    getCurrentUser(): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getCurrentBoard(): Promise<Board> {
        throw new Error("Method not implemented.");
    }
    
}