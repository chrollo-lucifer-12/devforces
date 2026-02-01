import { getAuthClient } from "@repo/auth/auth-client";
import { env } from "./env/client";

export const authClient = getAuthClient(env.NEXT_PUBLIC_BETTER_AUTH_URL);
