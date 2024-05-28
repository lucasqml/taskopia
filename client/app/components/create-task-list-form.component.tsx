import { useForm } from "react-hook-form";

type CreateTaskListFormComponentProps = {
  onCreateList: (title: string) => void;
};

export function CreateTaskListForm({
  onCreateList,
}: CreateTaskListFormComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      aria-label="Add List Form"
      className="w-72 h-min bg-gray-200 rounded-lg p-4 pt-0"
      onSubmit={handleSubmit(({ title }) => onCreateList(title))}
    >
      <input
        type="text"
        placeholder="List Name"
        className="w-full mt-4 p-2 border border-gray-300 rounded-md"
        {...register("title", { required: true })}
      />
      <button
        className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
        type="submit"
      >
        Add List
      </button>
    </form>
  );
}
