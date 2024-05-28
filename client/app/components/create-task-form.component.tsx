import { useState } from "react";
import { CreateTaskInput } from "../providers/interfaces";
import { TaskList } from "../types";
import { Controller, useForm } from "react-hook-form";

type CreateTaskFormProps = {
  onSubmit: (input: CreateTaskInput) => void;
  taskList: TaskList;
  createInputRef: React.RefObject<HTMLInputElement>;
};

type FormData = {
  title: string;
};

export function CreateTaskForm({
  onSubmit,
  taskList,
  createInputRef,
}: CreateTaskFormProps) {
  const { register, handleSubmit, reset, control } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  const onFormSubmit = (formData: FormData) => {
    const positionInList = taskList.tasks.length;
    const newTaskTitle =
      formData.title.trim() || "Sem título + " + positionInList;
    onSubmit({
      description: "",
      title: newTaskTitle,
      taskListId: taskList.id,
      positionInList,
    });
    reset({
      title: "",
    });
  };
  return (
    <form
      className="flex flex-col gap-2 w-full justify-end p-0"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="rounded border-2 bg-white min-h-20 max-h-20">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="min-h-10 p-2 w-full border-none bg-transparent focus:outline-none text-pink-500"
              type="text"
              placeholder="Task title"
              ref={createInputRef}
            />
          )}
        />
      </div>
      <button type="submit" className="p-2 rounded bg-green-500 text-white">
        Add Task
      </button>
    </form>
  );
}
