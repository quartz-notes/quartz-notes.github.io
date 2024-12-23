import { filterSuggestionItems, locales, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { useEffect, useMemo, useState } from "react";
import useNoteStore from "../stores/notes.store";
import TitleEditor from "./TitleEditor";
import { BoxIcon } from "lucide-react";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import getAIResponse from "../services/ai.service";

const insertAIItem = (editor: BlockNoteEditor) => ({
  title: "Нейросеть",
  onItemClick: async () => {
    const currentBlock = editor.getTextCursorPosition().block;
    const response = await getAIResponse(currentBlock.content[0].text);
    const helloWorldBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: response, styles: { bold: true } }],
    };

    editor.insertBlocks([helloWorldBlock], currentBlock, "after");
  },
  aliases: ["gpt", "ии", "ai", "гпт", "ген"],
  group: "Прочее",
  icon: <BoxIcon size={18} />,
  subtext: "Генерирует ответ на введенный вопрос",
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertAIItem(editor),
];

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
        slashMenu={false}
        onChange={() => {
          updateNote(currentNote!, editor.document);
        }}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </>
  );
}

export default Editor;
