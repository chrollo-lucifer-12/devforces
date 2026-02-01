"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { AuthUIProvider } from "@repo/ui/better-auth-ui";
import { authClient } from "../lib/auth-client";

const socialOptions = {
  providers: ["github"],
};

function BetterAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
      Link={Link}
      emailOTP
      social={socialOptions}
      baseURL="/"
    >
      {children}
    </AuthUIProvider>
  );
}

export default BetterAuthProvider;
