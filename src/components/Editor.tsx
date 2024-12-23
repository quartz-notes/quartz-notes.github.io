import { locales, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useEffect, useMemo, useState } from "react";
import useNoteStore from "../stores/notes.store";
import TitleEditor from "./TitleEditor";

function Editor() {
  const updateNote = useNoteStore((state) => state.updateNoteContent);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNote, loadData]);

  const config = {
    dictionary: locales.ru,
  };

  const editor = useMemo(() => {
    if (initialContent?.length === 0) {
      return BlockNoteEditor.create({
        ...config,
      });
    }
    return BlockNoteEditor.create({
      initialContent: initialContent,
      ...config,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent]);

  return (
    <>
      <TitleEditor />
      <BlockNoteView
        editor={editor}
        onChange={() => {
          updateNote(currentNote!, editor.document);
        }}
      />
    </>
  );
}

export default Editor;
