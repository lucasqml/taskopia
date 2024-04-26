import { type TaskList } from "@/app/types";
import { Task as TaskComponent } from "@/app/components";
import { CreateTaskInput, EditTaskInput } from "../providers/interfaces";
import { useRef, useState } from "react";

type TaskListProps = {
  taskList: TaskList;
  onAddTask: (task: CreateTaskInput) => void;
  onEditTask: (task: EditTaskInput) => void;
};

export function TaskList({ taskList, onAddTask, onEditTask }: TaskListProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const createInputRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = () => {
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
    createInputRef.current?.focus({
      preventScroll: true,
    });
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
          className="bg-white p-2 rounded text-blue-400"
        >
          Add Task
        </button>
      </div>
      <ul className="flex flex-col gap-2 h-full overflow-y-auto sticky bottom-0">
        {taskList.tasks
          .sort((a, b) => a.positionInList - b.positionInList)
          .map((task) => (
            <TaskComponent key={task.id} task={task} onEditTask={onEditTask} />
          ))}

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
      </ul>
    </section>
  );
}
