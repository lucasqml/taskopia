import { type Task, TaskList } from "@/app/types";
import { Task as TaskComponent } from "@/app/components";
import { CreateTaskInput } from "../providers/interfaces";
import { useEffect, useRef, useState } from "react";

type TaskListProps = {
  taskList: TaskList;
  onAddTask: (task: CreateTaskInput) => void;
};

export function TaskList({ taskList, onAddTask }: TaskListProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const createInputRef = useRef<HTMLInputElement>(null);

  const onCreateButtonClick = () => {
    const positionInList = taskList.tasks.length;
    const newTaskTitle = taskTitle.trim() || "Sem título + " + positionInList;
    onAddTask({
      description: "",
      title: newTaskTitle,
      taskListId: taskList.id,
      positionInList,
    });
    setIsAddingTask(false);
    setTaskTitle("");
  };

  const onAddButtonClick = () => {
    setTaskTitle("");
    setIsAddingTask(true);
    createInputRef.current?.scrollIntoView({ behavior: "smooth" });
    createInputRef.current?.focus();
  };

  return (
    <section
      key={taskList.id}
      className="flex flex-col w-1/3 gap-6 bg-blue-400 p-4 rounded h-full min-w-52"
    >
      <div className="flex flex-row justify-between">
        <h3 className="text-lg text-left text-white font-bold">
          {taskList.title}
        </h3>
        <button
          onClick={onAddButtonClick}
          className="bg-white text-black p-2 rounded"
        >
          Add Task
        </button>
      </div>
      <ul className="flex flex-col gap-2 h-full overflow-y-auto">
        {taskList.tasks
          .sort((a, b) => a.positionInList - b.positionInList)
          .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}

        <form
          className="flex flex-col gap-2 w-full justify-end"
         
        >
          <input
            type="text"
            placeholder="Task title"
            onChange={(e) => setTaskTitle(e.target.value)}
            ref={createInputRef}
          />
          <button
            type="button"
            onClick={onCreateButtonClick}
            className="bg-red-400 text-black p-2 rounded"
          >
            Create Task
          </button>
          
        </form>
      </ul>
    </section>
  );
}
