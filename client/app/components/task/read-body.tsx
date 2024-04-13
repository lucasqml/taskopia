import { TaskProps } from "./task.component";

type TaskReadBodyProps = TaskProps & {
  onEditButtonClick: () => void;
};

export function TaskReadBody({ task, onEditButtonClick }: TaskReadBodyProps) {
  return (
    <>
      <header className="flex flex-row justify-between">
        <h4 className="text-cyan-600">{task.title}</h4>
        <button
          onClick={onEditButtonClick}
          className="bg-gray-300 p-1 rounded"
        >
          Edit
        </button>
      </header>
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
    </>
  );
}
