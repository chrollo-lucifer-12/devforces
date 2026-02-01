import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema";

export function createDb(connectionString: string) {
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : false,
  });

  return drizzle(pool, { schema });
}

export type Database = ReturnType<typeof createDb>;

export * from "./db/schema";
export * from "drizzle-orm";
