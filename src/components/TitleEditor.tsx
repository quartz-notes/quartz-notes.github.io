import useNoteStore from "../stores/notes.store";

function TitleEditor() {
  const currentNote = useNoteStore((state) => state.currentNote);
  const notes = useNoteStore((state) => state.notes);
  const updateNoteTitle = useNoteStore((state) => state.updateNoteTitle);

  return (
    <input
      placeholder={`заметка ${currentNote}`}
      value={notes.find((note) => note.id === currentNote)?.title}
      onChange={(e) => updateNoteTitle(currentNote!, e.target.value)}
      className="pl-13 pr-13 mb-2 text-6xl font-bold outline-hidden placeholder:italic"
    />
  );
}

export default TitleEditor;
