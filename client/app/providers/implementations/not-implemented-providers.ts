import { QueryOf } from "@/app/types/query";
import { Board, User } from "@/app/types";
import { CurrentUserProvider } from "../interfaces/current-user-provider";
import { CreateListInput, CreateTaskInput, CurrentBoardProvider, DeleteTaskInput, EditListInput, EditTaskInput, MoveTaskInput } from "../interfaces/current-board-provider";

export class NotImplementedCurrentBoardProvider implements CurrentBoardProvider {
    currentBoard(): QueryOf<Board> {
        throw new Error("Method not implemented.");
    }

    createTask(task: CreateTaskInput): Promise<void> {
        throw new Error("Method not implemented.");
    }

    editTask(task: EditTaskInput): Promise<void> {
        throw new Error("Method not implemented.");
    }

    moveTask(task: MoveTaskInput): Promise<void> {
        throw new Error("Method not implemented.");
    
    }

    deleteTask(task: DeleteTaskInput): Promise<void> {
        throw new Error("Method not implemented.");
    }

    createList(input: CreateListInput): Promise<void> {
        throw new Error("Method not implemented.");
    }

    editList(input: EditListInput): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export class NotImplementedCurrentUserProvider implements CurrentUserProvider {
    currentUser(): QueryOf<User> {
        throw new Error("Method not implemented.");
    }
}