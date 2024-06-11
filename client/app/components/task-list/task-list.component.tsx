import { type TaskList } from "@/app/types";
import { CreateTaskForm, Task as TaskComponent } from "@/app/components";
import {
  CreateTaskInput,
  EditListInput,
  EditTaskInput,
} from "../../providers/interfaces";
import { useRef, useState } from "react";
import { ReadHeader } from "./read-header.component";
import { EditHeader } from "./edit-header.component";

type TaskListProps = {
  taskList: TaskList;
  onAddTask: (task: CreateTaskInput) => void;
  onEditTask: (task: EditTaskInput) => void;
  onEditTaskList: (taskList: EditListInput) => void;
};

export function TaskList({
  taskList,
  onAddTask,
  onEditTask,
  onEditTaskList,
}: TaskListProps) {
  const [isEditing, setIsEditing] = useState(false);

  const createInputRef = useRef<HTMLInputElement>(null);

  const onAddButtonClick = () => {
    createInputRef.current?.scrollIntoView({ behavior: "smooth" });
    createInputRef.current?.focus({
      preventScroll: true,
    });
  };

  const onEditButtonClick = () => {
    setIsEditing(true);
  };

  const onCancelButtonClick = () => {
    setIsEditing(false);
  };

  const onEditSubmit = (input: EditListInput) => {
    onEditTaskList(input);
    setIsEditing(false);
  }

  return (
    <section
      key={taskList.id}
      className="flex flex-col w-1/3 gap-6 bg-blue-400 p-4 rounded h-full min-w-52"
    >
      {isEditing ? (
        <EditHeader
          taskList={taskList}
          onCancelButtonClick={onCancelButtonClick}
          onSubmitButtonClick={onEditSubmit}
        />
      ) : (
        <ReadHeader
          taskList={taskList}
          onAddButtonClick={onAddButtonClick}
          onEditButtonClick={onEditButtonClick}
        />
      )}
      <ul className="flex flex-col gap-2 h-full overflow-y-auto sticky bottom-0">
        {taskList.tasks
          .sort((a, b) => a.positionInList - b.positionInList)
          .map((task) => (
            <TaskComponent key={task.id} task={task} onEditTask={onEditTask} />
          ))}
        <CreateTaskForm
          createInputRef={createInputRef}
          onSubmit={onAddTask}
          taskList={taskList}
        />
      </ul>
    </section>
  );
}
