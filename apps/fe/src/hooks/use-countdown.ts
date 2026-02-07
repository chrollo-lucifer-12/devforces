"use client";

import { useEffect, useRef, useState } from "react";
import { useTimer } from "./queries";
import { formatTime } from "../lib/utils";
import { useRouter } from "next/navigation";

export function useCountdown(contestId: string) {
  const timer = useTimer(contestId);
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(0);
  const endTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (timer.data?.timeLeft !== undefined) {
      endTimeRef.current = Date.now() + timer.data.timeLeft;
    }
  }, [timer.data?.timeLeft]);

  useEffect(() => {
    const tick = () => {
      if (endTimeRef.current) {
        const remaining = Math.max(0, endTimeRef.current - Date.now());

        setTimeLeft(remaining);

        if (remaining === 0 && !redirectedRef.current) {
          redirectedRef.current = true;
          router.replace(`/contest/${contestId}/ended`);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [contestId, router]);

  return formatTime(timeLeft);
}
