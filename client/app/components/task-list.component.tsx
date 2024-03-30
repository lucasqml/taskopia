import { type Task, TaskList } from "@/app/types";
import { Task as TaskComponent } from "@/app/components";
import { CreateTaskInput } from "../providers/interfaces";

type TaskListProps = {
  taskList: TaskList;
  onAddTask: (task: CreateTaskInput) => void;
};

export function TaskList({ taskList, onAddTask }: TaskListProps) {
  const onAddButtonClick = () => {
    const positionInList = taskList.tasks.length;

    onAddTask({
      description: "",
      title: "Sem título + " + positionInList,
      taskListId: taskList.id,
      positionInList,
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
        <button onClick={onAddButtonClick} className="bg-white text-black p-2 rounded">
          Add Task
        </button>
      </div>
      <ul className="flex flex-col gap-2 h-full overflow-y-auto">
        {taskList.tasks
          .sort((a, b) => a.positionInList - b.positionInList)
          .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
      </ul>
    </section>
  );
}
