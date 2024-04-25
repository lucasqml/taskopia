import { type Task } from "@/app/types";
import { useState } from "react";
import { TaskReadBody } from "./read-body";
import { TaskEditBody } from "./edit-body";
import { EditTaskInput, useCurrentBoardProvider } from "@/app/providers/interfaces";

export type TaskProps = {
  task: Task;
  onEditTask: (task: EditTaskInput) => void;
};

export function Task({ task, onEditTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    moveTask,
    currentBoard
  } = useCurrentBoardProvider();

  function onMoveTaskClick() {
    const currentBoardData = currentBoard().data;
    if (!currentBoardData) {
      throw new Error('Board not found');
    }
    const sortedTaskLists = currentBoardData.taskLists.sort((a, b) => a.positionInBoard - b.positionInBoard);
    const currentTaskListIndex = sortedTaskLists.findIndex(taskList => taskList.id === task.taskListId);
    const nextTaskList = sortedTaskLists[currentTaskListIndex + 1];
    const newPositionInList = nextTaskList.tasks.length;
    const input = {
      taskId: task.id,
      originTaskListId: task.taskListId,
      destinationTaskListId: nextTaskList.id,
      positionInList: newPositionInList
    }

    moveTask(input);
    
  }
  return (
    <li
      key={task.id}
      className="flex flex-col justify-between gap-1 min-h-20 bg-gray-100 p-2 pt-3 rounded"
    >
      <button
        className="bg-blue-500 text-white rounded p-1"
        onClick={() => onMoveTaskClick()}
      >Move</button>
      {!isEditing && (
        <TaskReadBody
          task={task}
          onEditButtonClick={() => setIsEditing(true)}
        />
      )}
      {isEditing && (
        <TaskEditBody
          task={task}
          onCancelButtonClick={() => setIsEditing(false)}
          onSaveButtonClick={
            (task: EditTaskInput) => {
              onEditTask(task);
              setIsEditing(false);
            }
          }
        />
      )}
    </li>
  );
}
