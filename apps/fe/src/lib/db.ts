import { createDb } from "@repo/db";
import type { Database } from "@repo/db";
import { env } from "./env";

export const db: Database = createDb(env.DATABASE_URL);
