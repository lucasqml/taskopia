import { Board, Task } from "@/app/types";
import { BoardAPI, CreateTaskInput } from "@/app/providers/interfaces";
import { QueryOf } from "@/app/types/query";
import { useEffect, useState } from "react";

type AddTaskAction = {
    type: "ADD_TASK";
    actionResult: Task;
    actionInput: CreateTaskInput;
};

type BoardAction = AddTaskAction;

type BoardProviderActionsHandlerData = {
    currentBoardQuery: QueryOf<Board>;
    setBoardQueryState: (query: QueryOf<Board>) => void;
    boardAPI: BoardAPI
}

type BoardProviderActionsHandlerOutput = {
    addActionToQueue: (action: BoardAction) => void;
}

export function BoardProviderActionsHandler({
    currentBoardQuery,
    setBoardQueryState,
    boardAPI
}: BoardProviderActionsHandlerData): BoardProviderActionsHandlerOutput {

    const [actionsQueue, setActionsQueue] = useState<BoardAction[]>([]);

    async function processAddTaskAction(action: AddTaskAction) {
        // actually send the request to the server
        try {
            const task = action.actionInput;
            const optimisticTask = action.actionResult;
            const createdTask = await boardAPI.postTask(task);
            if (!currentBoardQuery.data) {
                throw new Error("No board loaded");
            }
            const board: Board = currentBoardQuery.data;

            // update the task with the server response
            const updatedBoard = {
                ...currentBoardQuery.data,
                taskLists: board.taskLists.map((taskList) => {
                    if (taskList.id === task.taskListId) {
                        return {
                            ...taskList,
                            tasks: taskList.tasks.map((task) => {
                                if (task.id === optimisticTask.id) {
                                    return createdTask;
                                }
                                return task;
                            }),
                        };
                    }
                    return taskList;
                }),
            };

            setBoardQueryState({
                isLoading: false,
                data: updatedBoard,
                error: null,
            });
        } catch (error: any) {
            // TODO throw better error
            throw error;
        }
    }

    useEffect(() => {
        async function processActions() {
            if (actionsQueue.length === 0) return;

            try {
                const action = actionsQueue[0];
                switch (action.type) {
                    case "ADD_TASK":
                        await processAddTaskAction(action);
                        break;
                }

                setActionsQueue(actionsQueue.slice(1));
            } catch (error: any) {
                // TODO handle error: take action to retry, revert followed actions, etc
                alert(`Error processing action: ${error.message}`);
                setActionsQueue([]);
                setBoardQueryState({
                    isLoading: false,
                    data: currentBoardQuery.data,
                    error: error,
                });
            }
        }

        processActions();
    });

    return {
        addActionToQueue: (action: BoardAction) => {
            setActionsQueue([...actionsQueue, action]);
        }
    }
}