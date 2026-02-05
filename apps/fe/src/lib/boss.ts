import "server-only";

import { createBoss } from "@repo/boss/boss";
import { env } from "./env/server";

export const boss = createBoss(env.DATABASE_URL);
