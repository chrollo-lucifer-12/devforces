"use client";
import { Editor } from "@monaco-editor/react";
import { Button } from "@repo/ui/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";
import { axiosInstance } from "../../lib/fetcher";
const ChallengeEditor = ({
  markdown,
  challengeId,
  contestId,
}: {
  markdown: string;
  contestId: string;
  challengeId: string;
}) => {
  const [code, setCode] = useState("");

  return (
    <ResizablePanelGroup>
      <ResizablePanel minSize={100}>
        <Markdown>{markdown}</Markdown>
        <Button
          onClick={async () => {
            if (!code || code.length === 0) return;
            try {
              await axiosInstance.post("/api/submit", {
                code,
                challengeId,
                contestId,
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Submit
        </Button>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={100}>
        <Editor
          value={code}
          onChange={(e) => {
            setCode(e!);
          }}
          height="100vh"
          defaultLanguage="typescript"
          defaultValue="// some comment"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChallengeEditor;
