import { type TaskList } from "@/app/types";
import { CreateTaskForm, Task as TaskComponent } from "@/app/components";
import { CreateTaskInput, EditListInput, EditTaskInput } from "../../providers/interfaces";
import { useRef } from "react";
import { ReadHeader } from "./read-header.component";

type TaskListProps = {
  taskList: TaskList;
  onAddTask: (task: CreateTaskInput) => void;
  onEditTask: (task: EditTaskInput) => void;
  onEditTaskList: (taskList: EditListInput) => void;
};

export function TaskList({ taskList, onAddTask, onEditTask, onEditTaskList }: TaskListProps) {
  const createInputRef = useRef<HTMLInputElement>(null);

  const onAddButtonClick = () => {
    createInputRef.current?.scrollIntoView({ behavior: "smooth" });
    createInputRef.current?.focus({
      preventScroll: true,
    });
  };

  const onEditButtonClick = () => {
    const newTitle = prompt("Insert the new task list title (se vazio, mantem igual)") || taskList.title

    onEditTaskList({
      taskListId: taskList.id,
      title: newTitle
    })
  }

  return (
    <section
      key={taskList.id}
      className="flex flex-col w-1/3 gap-6 bg-blue-400 p-4 rounded h-full min-w-52"
    >
      <ReadHeader 
        taskList={taskList} 
        onAddButtonClick={onAddButtonClick}
        onEditButtonClick={onEditButtonClick}
      />
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
