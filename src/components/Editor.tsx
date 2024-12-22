import { PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useMemo } from "react";
import useNoteStore from "../stores/notes.store";

function Editor({ initialContent }: { initialContent: PartialBlock[] }) {
  const updateNote = useNoteStore((state) => state.updateNote);
  const currentNote = useNoteStore((state) => state.currentNote);

  const editor = useMemo(() => {
    if (initialContent.length === 0) {
      return BlockNoteEditor.create();
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        updateNote(currentNote!, editor.document);
      }}
    />
  );
}

export default Editor;
