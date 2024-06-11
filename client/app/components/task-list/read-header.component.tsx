import { type TaskList } from "@/app/types";
import { EditIcon } from "../../icons";

type ReadPropsHeader = {
  taskList: TaskList;
  onAddButtonClick: () => void;
  onEditButtonClick: () => void;
};

export function ReadHeader({
  taskList,
  onAddButtonClick,
  onEditButtonClick,
}: ReadPropsHeader) {
  return (
    <div className="flex flex-row justify-between">
      <h3 className="text-lg text-left text-white font-bold">
        {taskList.title}
      </h3>
      <div className="flex justify-end gap-2">
        <button onClick={onEditButtonClick} className="bg-white p-2 rounded">
          <EditIcon />
        </button>
        <button
          onClick={onAddButtonClick}
          className="bg-white p-2 rounded text-blue-400"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
