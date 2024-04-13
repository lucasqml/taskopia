import { useState } from "react";
import { TaskProps } from "./task.component";
import { type Task } from "@/app/types";

type TaskEditBodyProps = TaskProps & {
  onCancelButtonClick: () => void;
  onSaveButtonClick: (task: Task) => void;
};

export function TaskEditBody({
  task,
  onCancelButtonClick,
  onSaveButtonClick,
}: TaskEditBodyProps) {
  const [formTask, setFormTask] = useState<Task>(task);
  const titleInputId = `task-title-${task.id}`;
  const descriptionInputId = `task-description-${task.id}`;
  return (
    <>
      <main className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-cyan-600" htmlFor={titleInputId}>
            Title
          </label>
          <input
            type="text"
            id={titleInputId}
            value={task.title}
            onChange={(e) =>
              setFormTask({ ...formTask, title: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-cyan-600" htmlFor={descriptionInputId}>
            Description
          </label>
          <textarea
            value={task.description}
            id={descriptionInputId}
            onChange={(e) =>
              setFormTask({ ...formTask, description: e.target.value })
            }
          />
        </div>
      </main>
      <footer className="flex flex-row justify-end gap-4 mt-6">
        <button
          onClick={onCancelButtonClick}
          className="bg-grey-300 p-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => onSaveButtonClick(formTask)}
          className="bg-green-600 py-2 px-5 rounded text-white"
        >
          Save Changes
        </button>
      </footer>
    </>
  );
}
