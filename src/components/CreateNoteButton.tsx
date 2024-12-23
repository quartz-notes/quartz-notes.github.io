import { PlusIcon } from "lucide-react";
import useNoteStore from "../stores/notes.store";

function CreateNoteButton() {
  const createNote = useNoteStore((state) => state.createNote);

  return (
    <button
      className="cursor-pointer text-center transition-colors p-2 rounded-md text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
      onClick={() => createNote()}
    >
      <PlusIcon />
    </button>
  );
}

export default CreateNoteButton;
