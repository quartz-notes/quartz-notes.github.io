import { TrashIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

function TrashButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-stone-400 dark:text-stone-500 p-0.5 rounded-md transition-colors hover:bg-stone-300 dark:hover:bg-stone-600"
      {...props}
    >
      <TrashIcon />
    </button>
  );
}

export default TrashButton;
