import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import Sidebar from "./components/Sidebar";

function App() {
  const editor = useCreateBlockNote();
  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 p-10">
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
}

export default App;
