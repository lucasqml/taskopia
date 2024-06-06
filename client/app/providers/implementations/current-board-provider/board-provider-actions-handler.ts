import { Board, Task, TaskList } from "@/app/types";
import { BoardAPI, CreateListInput, CreateTaskInput, DeleteTaskInput, EditListInput, EditTaskInput, MoveTaskInput } from "@/app/providers/interfaces";
import { QueryOf } from "@/app/types/query";
import { useEffect, useState } from "react";

type AddTaskAction = {
    type: "ADD_TASK";
    actionResult: Task;
    actionInput: CreateTaskInput;
};

type EditTaskAction = {
    type: "EDIT_TASK";
    actionResult: Task;
    actionInput: EditTaskInput;
};

type MoveTaskAction = {
    type: "MOVE_TASK";
    actionResult: Task;
    actionInput: MoveTaskInput;
};

type DeleteTaskAction = {
    type: "DELETE_TASK";
    actionInput: DeleteTaskInput;
};

type CreateListAction = {
    type: "CREATE_LIST";
    actionResult: TaskList;
    actionInput: CreateListInput;
};

type EditListAction = {
    type: "EDIT_LIST",
    actionResult: TaskList;
    actionInput: EditListInput;
}

type BoardAction = AddTaskAction | EditTaskAction | MoveTaskAction | DeleteTaskAction | CreateListAction | EditListAction

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

    async function processEditTaskAction(action: EditTaskAction) {
        // actually send the request to the server
        try {
            const task = action.actionInput;
            const optimisticTask = action.actionResult;
            const editedTask = await boardAPI.putTask(task);
            if (!currentBoardQuery.data) {
                throw new Error("No board loaded");
            }
            const board: Board = currentBoardQuery.data;

            // update the task with the server response
            const updatedBoard = {
                ...currentBoardQuery.data,
                taskLists: board.taskLists.map((taskList) => {
                    return {
                        ...taskList,
                        tasks: taskList.tasks.map((task) => {
                            if (task.id === optimisticTask.id) {
                                return editedTask;
                            }
                            return task;
                        }),
                    };
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

    async function processMoveTaskAction(action: MoveTaskAction) {
        // actually send the request to the server
        try {
            const actionInputTask = action.actionInput;
            const optimisticTask = action.actionResult;
            const actionResultTask = await boardAPI.moveTask(actionInputTask);
            if (!currentBoardQuery.data) {
                throw new Error("No board loaded");
            }
            const board: Board = currentBoardQuery.data;

            // update the task with the server response
            const updatedBoard = {
                ...currentBoardQuery.data,
                taskLists: board.taskLists.map((taskList) => {
                    return {
                        ...taskList,
                        tasks: taskList.tasks.map((t) => {
                            if (t.id === optimisticTask.id) {
                                return actionResultTask;
                            }
                            return t;
                        }),
                    };
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

    async function processDeleteTaskAction(action: DeleteTaskAction) {
        // actually send the request to the server
        try {
            await boardAPI.deleteTask(action.actionInput)

        } catch (error: any) {
            // TODO throw better error
            throw error;
        }
    }

    async function processCreateListAction(action: CreateListAction) {
        // actually send the request to the server
        try {
            const taskList = action.actionInput;
            const optimisticTaskList = action.actionResult;
            const createdTaskList = await boardAPI.postList(taskList);
            if (!currentBoardQuery.data) {
                throw new Error("No board loaded");
            }
            const board: Board = currentBoardQuery.data;

            // update the task with the server response
            const updatedBoard = {
                ...currentBoardQuery.data,
                taskLists: board.taskLists.map((taskList) => {
                    if (taskList.id === optimisticTaskList.id) {
                        return createdTaskList;
                    }
                    return taskList;
                }
                ),
            }

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


    async function processEditListAction(action: EditListAction) {
        // actually send the request to the server
        try {
            const taskList = action.actionInput;
            const optimisticTaskList = action.actionResult;
            const editedTaskList = await boardAPI.putList(taskList);
            if (!currentBoardQuery.data) {
                throw new Error("No board loaded");
            }
            const board: Board = currentBoardQuery.data;

            // update the list with the server response
            const updatedBoard = {
                ...currentBoardQuery.data,
                taskLists: board.taskLists.map((taskList) => {
                    if (taskList.id === optimisticTaskList.id) {
                        return editedTaskList
                    }
                    return taskList
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
                    case "EDIT_TASK":
                        await processEditTaskAction(action);
                        break;
                    case "MOVE_TASK":
                        await processMoveTaskAction(action);
                        break;
                    case "DELETE_TASK":
                        await processDeleteTaskAction(action);
                        break;
                    case "CREATE_LIST":
                        await processCreateListAction(action);
                        break;
                    case "EDIT_LIST":
                        // TODO do it
                        // await processEditListAction(action);
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