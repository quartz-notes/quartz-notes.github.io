import { PlusIcon } from "lucide-react";
import { cn } from "../lib/utils";
import useNoteStore from "../stores/notes.store";

function Sidebar() {
  const { notes, currentNote, setCurrentNote, createNote } = useNoteStore();

  return (
    <div className="w-64 border-r border-stone-900/10 pt-10 pb-10 pl-5 pr-5">
      <h1 className="text-3xl font-bold mb-4 p-2">Notes</h1>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className={cn(
              "cursor-pointer transition-colors hover:bg-stone-100 p-2 rounded",
              note.id === currentNote &&
                "bg-stone-300 text-stone-900 hover:bg-stone-300"
            )}
            onClick={() => setCurrentNote(note.id)}
          >
            Note {note.id}
          </li>
        ))}
        <li
          className="cursor-pointer text-center transition-colors p-2 rounded text-stone-900 hover:bg-stone-100"
          onClick={() => createNote()}
        >
          <PlusIcon />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
