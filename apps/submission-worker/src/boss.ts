import { createBoss } from "@repo/boss/boss";

export const boss = createBoss(process.env.DATABASE_URL!);
