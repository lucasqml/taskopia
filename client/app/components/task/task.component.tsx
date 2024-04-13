import { type Task } from "@/app/types";
import { useState } from "react";
import { TaskReadBody } from "./read-body";
import { TaskEditBody } from "./edit-body";

export type TaskProps = {
  task: Task;
};

export function Task({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      key={task.id}
      className="flex flex-col justify-between gap-1 min-h-20 bg-gray-100 p-2 pt-3 rounded"
    >
      {!isEditing && (

        <TaskReadBody task={task} onEditButtonClick={() => setIsEditing(true)} />
      )}
      {isEditing && (
        <TaskEditBody
          task={task}
          onCancelButtonClick={() => setIsEditing(false)}
          onSaveButtonClick={() => setIsEditing(false)}
        />
      )}
    </li>
  );
}
