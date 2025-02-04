/* eslint-disable react-hooks/exhaustive-deps */
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  locales,
  PartialBlock,
} from "@blocknote/core";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import "./editor.css";
import "@blocknote/shadcn/style.css";
import { useEffect, useMemo, useState } from "react";
import useNoteStore from "../../app/stores/notes.store";
import * as Button from "@/shared/ui/button";
import * as Badge from "@/shared/ui/badge";
import * as Card from "@/shared/ui/card";
import * as DropdownMenu from "@/shared/ui/dropdown-menu";
import * as Form from "@/shared/ui/form";
import * as Label from "@/shared/ui/label";
import * as Input from "@/shared/ui/input";
import * as Popover from "@/shared/ui/popover";
import * as Select from "@/shared/ui/select";
import * as Tabs from "@/shared/ui/tabs";
import * as Toggle from "@/shared/ui/toggle";
import * as Tooltip from "@/shared/ui/tooltip";
import getById from "@/shared/lib/get-by-id";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import { StarsIcon } from "lucide-react";
import generateBlocks from "@/shared/api/ai/generate.service";

const insertGeneratedBlocks = (editor: BlockNoteEditor) => ({
  title: "Сгенерировать...",
  onItemClick: async () => {
    const currentBlock = editor.getTextCursorPosition().block;

    const generatedBlocks: PartialBlock[] = await generateBlocks(
      // @ts-expect-error blocknote...
      currentBlock.content[0].text || ""
    );
    editor.insertBlocks(generatedBlocks, currentBlock, "after");
  },
  aliases: ["generate", "gen"],
  group: "Нейросеть",
  icon: <StarsIcon size={18} />,
  subtext: "Используется, чтобы превратить строку в блоки",
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  insertGeneratedBlocks(editor),
  ...getDefaultReactSlashMenuItems(editor),
];

function Editor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { audio, image, video, file, ...remainingBlockSpecs } =
    defaultBlockSpecs;

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...remainingBlockSpecs,
    },
  });

  const updateNote = useNoteStore((state) => state.updateNoteContent);
  const notes = useNoteStore((state) => state.notes);
  const currentNote = useNoteStore((state) => state.currentNote);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined
  >(getById(notes, currentNote)?.content);

  useEffect(() => {
    setInitialContent(notes.find((note) => note.id === currentNote)?.content);
  }, [currentNote]);

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
      // @ts-expect-error blocknote types
      initialContent: initialContent || [],
      schema,
      ...config,
    });
  }, [initialContent]);

  return (
    <>
      {/* <TitleEditor /> */}
      <BlockNoteView
        // @ts-expect-error blocknote types
        editor={editor}
        slashMenu={false}
        shadCNComponents={{
          Button,
          Badge,
          Card,
          DropdownMenu,
          Form,
          Input,
          Label,
          Popover,
          Select,
          Tabs,
          Toggle,
          Tooltip,
        }}
        onChange={() => {
          updateNote(currentNote, editor.document);
        }}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            // @ts-expect-error blocknote...
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </>
  );
}

export default Editor;
