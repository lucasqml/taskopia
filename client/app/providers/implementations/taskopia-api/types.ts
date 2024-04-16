export type GetBoardOutput = {
    id: string;
    user: {
        id: string;
        username: string;
    };
    taskLists: {
        id: string;
        board: string;
        title: string;
        positionInBoard: number;
        tasks: {
            id: string;
            taskList: string;
            title: string;
            description: string;
            positionInTaskList: number;
            createdAt: string;
            doneAt: string | null;
        }[]
    }[]
}

export type PostTaskInput = {
    title: string;
    description: string;
    taskList: {
        id: string;
    }
    positionInTaskList: number;
}

export type PutTaskInput = {
    title: string;
    description: string;
}

export type PostTaskOutput = {
    id: string;
    taskList: {
        id: string;
    }
    title: string;
    description: string;
    positionInTaskList: number;
    createdAt: string;
    doneAt: string | null;
}

export type PutTaskOutput = PostTaskOutput