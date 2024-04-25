import { type Task } from "@/app/types";
import { useState } from "react";
import { TaskReadBody } from "./read-body";
import { TaskEditBody } from "./edit-body";
import { EditTaskInput } from "@/app/providers/interfaces";

export type TaskProps = {
  task: Task;
  onEditTask: (task: EditTaskInput) => void;
};

export function Task({ task, onEditTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <li
      key={task.id}
      className="flex flex-col justify-between gap-1 min-h-30 bg-gray-100 p-2 pt-3 rounded"
    >
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
