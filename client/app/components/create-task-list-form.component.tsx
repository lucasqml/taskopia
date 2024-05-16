import { useForm } from "react-hook-form";

type CreateTaskListFormComponentProps = {
  onCreateList: (title: string) => void;
};

export function CreateTaskListForm({
  onCreateList,
}: CreateTaskListFormComponentProps) {

  const {} = useForm();
  return (
    <div
      aria-label="Add List Section"
      className="w-72 h-min bg-gray-200 rounded-lg p-4 pt-0"
    >
      <input
        type="text"
        placeholder="List Name"
        className="w-full mt-4 p-2 border border-gray-300 rounded-md"
      />
      <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md">
        Add List
      </button>
    </div>
  );
}
