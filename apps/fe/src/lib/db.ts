import { createDb } from "@repo/db";
import type { Database } from "@repo/db";
import { env } from "./env/server";

export const db: Database = createDb(env.DATABASE_URL);
