export type User = {
    id: string;
    name: string;
    email: string;
}

export type Task = {
    id: string;
    name: string;
    tags: string[];
    dueDate?: Date;
    positionInList: number;
}

export type TaskList = {
    id: string;
    name: string;
    positionInBoard: number;
    tasks: Task[];
}

export type Board = {
    id: string;
    name: string;
    taskLists: TaskList[];
}