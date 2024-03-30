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