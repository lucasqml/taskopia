import { Task } from "@/app/types";

type TaskProps = {
    task: Task;
};

export function Task({
    task
}: TaskProps) {
    return <li
    key={task.id}
    className="
  flex flex-col justify-between gap-1 min-h-20 bg-gray-100 p-2 pt-3 rounded 
"
  >
    <h4 className="text-cyan-600">{task.name}</h4>
    <div className="flex flex-row gap-1">
      {task.tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-300 px-1 py-0 rounded text-xs text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  </li>
}