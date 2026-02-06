import { PgBoss } from "pg-boss";

let bossInstance: PgBoss | null = null;
let started = false;

export const createBoss = async (url: string): Promise<PgBoss> => {
  if (!bossInstance) {
    bossInstance = new PgBoss(url);
  }

  if (!started) {
    await bossInstance.start();
    started = true;
    console.log("✅ PgBoss started");
  }

  return bossInstance;
};
