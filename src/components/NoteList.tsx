import useNoteStore from "../stores/notes.store";
import CreateNoteButton from "./CreateNoteButton";
import NoteListItem from "./NoteListItem";

function NoteList() {
  const notes = useNoteStore((state) => state.notes);
  const currentNote = useNoteStore((state) => state.currentNote);

  return (
    <ul>
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          active={note.id === currentNote}
        />
      ))}
      <CreateNoteButton />
    </ul>
  );
}

export default NoteList;
