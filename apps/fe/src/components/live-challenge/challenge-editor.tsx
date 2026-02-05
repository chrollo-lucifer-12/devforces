"use client";
import { Editor } from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import Markdown from "react-markdown";
const ChallengeEditor = ({ markdown }: { markdown: string }) => {
  return (
    <ResizablePanelGroup>
      <ResizablePanel minSize={100}>
        <Markdown>{markdown}</Markdown>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={100}>
        <Editor
          height="100vh"
          defaultLanguage="typescript"
          defaultValue="// some comment"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChallengeEditor;
