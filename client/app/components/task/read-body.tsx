import { Task } from "@/app/types";
import { TaskProps } from "./task.component";
import { LeftArrowIcon, RightArrowIcon } from "@/app/icons";
import { useCurrentBoardProvider } from "@/app/providers/interfaces";

type TaskReadBodyProps = {
  task: Task;
  onEditButtonClick: () => void;
};

export function TaskReadBody({ task, onEditButtonClick }: TaskReadBodyProps) {
  const { moveTask, currentBoard } = useCurrentBoardProvider();
  const boardQuery = currentBoard();
  if (boardQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (!boardQuery.data) {
    return <div>Board not found</div>;
  }

  const currentTaskListIndex = boardQuery.data.taskLists.findIndex(
    (taskList) => taskList.id === task.taskListId
  );

  const isLastTaskList = currentTaskListIndex === boardQuery.data.taskLists.length - 1;
  const isFirstTaskList = currentTaskListIndex === 0;

  const onMoveTaskClick = (direction: "forward" | "backward") => {
    const sortedTaskLists = boardQuery.data.taskLists.sort(
      (a, b) => a.positionInBoard - b.positionInBoard
    );

    const nextTaskListIndex = Math.max(
      Math.min(
        direction === "forward"
          ? currentTaskListIndex + 1
          : currentTaskListIndex - 1,
        sortedTaskLists.length - 1
      ),
      0
    );
    const nextTaskList = sortedTaskLists[nextTaskListIndex];
    const newPositionInList = nextTaskList.tasks.length;
    const input = {
      taskId: task.id,
      originTaskListId: task.taskListId,
      destinationTaskListId: nextTaskList.id,
      positionInList: newPositionInList,
    };

    moveTask(input);
  };

  
  return (
    <div className="flex flex-col gap-1 min-h-20 max-h-20 p-2 pt-3">
      <header className="flex flex-row justify-between">
        <h4 className="text-cyan-600">{task.title}</h4>
        <button onClick={onEditButtonClick} className="bg-gray-300 p-1 rounded min-w-16 max-h-8">
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
      <footer className="flex flex-row justify-between">
        {!isFirstTaskList && (
          <button
            className="bg-blue-500 text-white p-1 rounded"
            onClick={() => onMoveTaskClick("backward")}
          >
            <LeftArrowIcon />
          </button>
        )}
        {
          !isLastTaskList && (
            <button
              className="bg-blue-500 text-white p-1 rounded ml-auto"
              onClick={() => onMoveTaskClick("forward")}
            >
              <RightArrowIcon />
            </button>
          )
        }
      </footer>
    </div>
  );
}
