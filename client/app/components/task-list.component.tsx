import { TaskList } from "@/app/types"
import { Task } from "@/app/components"


type TaskListProps = {
  taskList: TaskList;
};

export function TaskList({ taskList }: TaskListProps) {
  return (
    <section
      key={taskList.id}
      className="flex flex-col w-1/3 gap-6 bg-blue-400 p-4 rounded h-full"
    >
      <h3 className="text-lg text-left text-white font-bold">
        {taskList.name}
      </h3>
      <ul className="flex flex-col gap-2">
        {taskList.tasks
          .sort((a, b) => a.positionInList - b.positionInList)
          .map((task) => (
            <Task key={task.id} task={task} />
          ))}
      </ul>
    </section>
  );
}
