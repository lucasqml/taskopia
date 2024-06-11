import { type TaskList } from "@/app/types";
import { CancelIcon } from "../../icons";
import { EditListInput } from "@/app/providers/interfaces";
import { useForm } from "react-hook-form";

type EditHeaderPropsHeader = {
  taskList: TaskList;
  onCancelButtonClick: () => void;
  onSubmitButtonClick: (input: EditListInput) => void;
};

export function EditHeader({
  taskList,
  onCancelButtonClick,
  onSubmitButtonClick,
}: EditHeaderPropsHeader) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditListInput>({
    defaultValues: {
      taskListId: taskList.id,
      title: taskList.title,
    },
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitButtonClick)}>
      <div className="flex flex-row justify-between relative">
        <input
          {...register("title")}
          className="text-lg text-left text-blue font-bold p-2 rounded w-full"
        />
        <button type="reset" onClick={onCancelButtonClick} className="rounded absolute right-3 top-3">
          <CancelIcon />
        </button>
      </div>
      <button type="submit"
        className="bg-red-400 text-white p-2 rounded"
      >
        Update List
      </button>
    </form>
  );
}
