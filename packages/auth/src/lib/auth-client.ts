"use client";

import { createAuthClient } from "better-auth/react";

export function getAuthClient(baseURL?: string) {
  return createAuthClient({
    baseURL: baseURL,
  });
}

export const authClient = getAuthClient();
