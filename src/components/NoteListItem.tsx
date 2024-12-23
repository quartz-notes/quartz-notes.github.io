import { cn } from "../lib/utils";
import useNoteStore, { Note } from "../stores/notes.store";
import TrashButton from "./TrashButton";

function NoteListItem({
  note,
  active = false,
}: {
  note: Note;
  active?: boolean;
}) {
  const setCurrentNote = useNoteStore((state) => state.setCurrentNote);
  const removeNote = useNoteStore((state) => state.removeNote);

  return (
    <li
      key={note.id}
      className={cn(
        "flex justify-between align-middle cursor-pointer transition-colors hover:bg-stone-100 dark:hover:bg-stone-800 p-2 rounded-md",
        active &&
          "bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-stone-50 hover:bg-stone-200 dark:hover:bg-stone-700"
      )}
      onClick={() => {
        setCurrentNote(note.id);
      }}
    >
      {note.title.slice(0, 15) + (note.title.length > 15 ? "..." : "") ||
        `заметка ${note.id}`}
      <TrashButton
        onClick={(event) => {
          removeNote(note.id);
          event.stopPropagation();
        }}
      />
    </li>
  );
}

export default NoteListItem;
