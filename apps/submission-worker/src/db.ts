import { createDb } from "@repo/db";
import type { Database } from "@repo/db";

export const db: Database = createDb(process.env.DATABASE_URL!);
