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
import { fetcher } from "../../lib/fetcher";
import { useLocalStorage } from "../../hooks/use-localstorage";
import { useDebounce } from "use-debounce";
import useSWRMutation from "swr/mutation";
import { submitFetcher } from "../../hooks/mutations";
import useSWR from "swr";
import { useCountdown } from "../../hooks/use-countdown";

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
  const timer = useCountdown(contestId);
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
        return data.status !== "FINISHED" ? 2000 : 0;
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

  const isRunning =
    statusData && statusData.status && statusData.status !== "FINISHED";

  const getStatusLabel = () => {
    if (isMutating) return "Submitting...";
    if (!statusData) return "Idle";
    return statusData.status;
  };

  return (
    <>
      <ResizablePanelGroup>
        <ResizablePanel minSize={40} className="p-4 space-y-4 overflow-auto">
          <Markdown>{markdown}</Markdown>

          <div className="flex items-center gap-3">
            <Button
              disabled={isMutating || isRunning || !code.trim()}
              onClick={() => {
                trigger({
                  code,
                  challengeId,
                  contestId,
                });
              }}
            >
              {isMutating
                ? "Submitting..."
                : isRunning
                  ? "Running..."
                  : "Submit"}
            </Button>

            <span
              className={`text-sm px-3 py-1 rounded-md border
              ${
                statusData?.status === "FINISHED"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : statusData?.status
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                    : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {getStatusLabel()}
            </span>
          </div>

          {statusData?.status === "FINISHED" && (
            <div className="border rounded-md p-3 bg-muted">
              <p className="font-semibold mb-2">Result</p>

              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(statusData.result, null, 2)}
              </pre>
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel minSize={40}>
          <Editor
            value={code}
            onChange={(e) => setCode(e ?? "")}
            height="100vh"
            defaultLanguage="typescript"
            defaultValue="// Start coding..."
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="fixed bottom-6 right-6 z-50">
        <Button className="shadow-lg rounded-full px-5 py-6 text-sm">
          ⏳ {timer}
        </Button>
      </div>
    </>
  );
};

export default ChallengeEditor;
