/* eslint-disable react-hooks/exhaustive-deps */
import { locales, PartialBlock } from "@blocknote/core";
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

function Editor() {
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
      initialContent: initialContent,
      ...config,
    });
  }, [initialContent]);

  return (
    <>
      {/* <TitleEditor /> */}
      <BlockNoteView
        editor={editor}
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
      />
    </>
  );
}

export default Editor;
