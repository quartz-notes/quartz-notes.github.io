import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

function App() {
  const editor = useCreateBlockNote();
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
}

export default App;
