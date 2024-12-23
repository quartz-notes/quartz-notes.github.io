import { PlusIcon, TrashIcon } from "lucide-react";
import { cn } from "../lib/utils";
import useNoteStore from "../stores/notes.store";

function Sidebar() {
  const notes = useNoteStore((state) => state.notes);
  const currentNote = useNoteStore((state) => state.currentNote);
  const setCurrentNote = useNoteStore((state) => state.setCurrentNote);
  const createNote = useNoteStore((state) => state.createNote);
  const removeNote = useNoteStore((state) => state.removeNote);

  return (
    <div className="w-64 border-r border-stone-900/10 dark:border-stone-50/10 pt-10 pb-10 pl-5 pr-5">
      <h1 className="text-3xl font-bold mb-4 p-2">Notes</h1>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className={cn(
              "flex justify-between align-middle cursor-pointer transition-colors hover:bg-stone-100 dark:hover:bg-stone-800 p-2 rounded-md",
              note.id === currentNote &&
                "bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-50 hover:bg-stone-200 dark:hover:bg-stone-700"
            )}
            onClick={() => setCurrentNote(note.id)}
          >
            Note {note.id}
            <TrashIcon
              className="text-stone-400 dark:text-stone-500 p-0.5 rounded-md transition-colors hover:bg-stone-300 dark:hover:bg-stone-600"
              onClick={(e) => {
                removeNote(note.id);
                e.stopPropagation();
              }}
            />
          </li>
        ))}
        <li
          className="cursor-pointer text-center transition-colors p-2 rounded-md text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
          onClick={() => createNote()}
        >
          <PlusIcon />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
