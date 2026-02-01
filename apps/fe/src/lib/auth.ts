import { createAuth } from "@repo/auth/auth";
import { db } from "./db";
import { env } from "./env";

export const auth = createAuth(
  {
    githubClientId: env.GITHUB_CLIENT_ID,
    githubClientSecret: env.GITHUB_CLIENT_SECRET as string,
  },
  db,
);
