import { useState } from "react";
import { CreateTaskInput } from "../providers/interfaces";
import { TaskList } from "../types";

type CreateTaskFormProps = {
  onSubmit: (input: CreateTaskInput) => void;
  taskList: TaskList;
  createInputRef: React.RefObject<HTMLInputElement>;
};

export function CreateTaskForm({
  onSubmit,
  taskList,
  createInputRef,
}: CreateTaskFormProps) {
  const [taskTitle, setTaskTitle] = useState("");

  const onFormSubmit = () => {
    const positionInList = taskList.tasks.length;
    const newTaskTitle = taskTitle.trim() || "Sem título + " + positionInList;
    onSubmit({
      description: "",
      title: newTaskTitle,
      taskListId: taskList.id,
      positionInList,
    });
    setTaskTitle("");
  };
  return (
    <form
      className="flex flex-col gap-2 w-full justify-end p-0"
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <div className="rounded border-2 bg-white min-h-20 max-h-20">
        <input
          className="min-h-10 p-2 w-full border-none bg-transparent focus:outline-none text-pink-500"
          type="text"
          placeholder="Task title"
          onChange={(e) => setTaskTitle(e.target.value)}
          ref={createInputRef}
        />
      </div>
      <button type="submit" className="p-2 rounded bg-green-500 text-white">
        Add Task
      </button>
    </form>
  );
}
