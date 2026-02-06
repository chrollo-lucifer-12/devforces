"use client";
import { Editor } from "@monaco-editor/react";
import { Button } from "@repo/ui/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { axiosInstance, fetcher } from "../../lib/fetcher";
import { useLocalStorage } from "../../hooks/use-localstorage";
import { useDebounce } from "use-debounce";
import useSWRMutation from "swr/mutation";
import { submitFetcher } from "../../hooks/mutations";
import useSWR from "swr";
const ChallengeEditor = ({
  markdown,
  challengeId,
  contestId,
}: {
  markdown: string;
  contestId: string;
  challengeId: string;
}) => {
  const storage = useLocalStorage();
  const [code, setCode] = useState("");
  const [debouncedCode] = useDebounce(code, 1000);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const { trigger, isMutating } = useSWRMutation("/api/submit", submitFetcher, {
    onSuccess(data) {
      setSubmissionId(data.submissionId);
    },
  });

  const { data: statusData } = useSWR(
    submissionId ? `/api/submission-status?id=${submissionId}` : null,

    fetcher,

    {
      refreshInterval: (data) => {
        if (!data) return 2000;

        if (data.status !== "FINISHED") {
          return 2000;
        }

        return 0;
      },
    },
  );

  useEffect(() => {
    const saved = storage.get(`${contestId}-${challengeId}`);
    if (saved) setCode(saved);
  }, []);

  useEffect(() => {
    storage.set(`${contestId}-${challengeId}`, debouncedCode);
  }, [debouncedCode]);

  return (
    <ResizablePanelGroup>
      <ResizablePanel minSize={100}>
        <Markdown>{markdown}</Markdown>
        <Button
          disabled={isMutating}
          onClick={() => {
            if (!code.trim()) return;

            trigger({
              code,
              challengeId,
              contestId,
            });
          }}
        >
          {isMutating ? "Submitting..." : "Submit"}
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
