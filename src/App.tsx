import "@blocknote/mantine/style.css";
import Sidebar from "./components/Sidebar";
import { PartialBlock } from "@blocknote/core";
import { useEffect, useState } from "react";
import useNoteStore from "./stores/notes.store";
import Editor from "./components/Editor";

function App() {
  const notes = useNoteStore((state) => state.notes);
  const loadData = useNoteStore((state) => state.loadData);
  const currentNote = useNoteStore((state) => state.currentNote);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined
  >(undefined);

  useEffect(() => {
    loadData().then(() => {
      setInitialContent(notes.find((note) => note.id === currentNote)?.content);
    });
  }, [currentNote, loadData]);

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 p-10">
        <Editor initialContent={initialContent || []} />
      </div>
    </div>
  );
}

export default App;
