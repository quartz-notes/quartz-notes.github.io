import { useBlockNoteEditor, useComponentsContext } from "@blocknote/react";
import { NotePartialBlock } from "./api/schema";
import summarize from "@/shared/api/ai/summarize.service";

export default function SummarizeButton() {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={"Законспектировать"}
      onClick={async () => {
        console.log(editor.getSelectedText());

        const currentBlock = editor.getTextCursorPosition().block;

        const generatedBlocks: NotePartialBlock[] = await summarize(
          editor.getSelectedText()
        );
        console.log(generatedBlocks);
        editor.insertBlocks(generatedBlocks, currentBlock, "after");
      }}
    >
      Законспектировать
    </Components.FormattingToolbar.Button>
  );
}
