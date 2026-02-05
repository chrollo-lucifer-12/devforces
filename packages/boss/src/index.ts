import { PgBoss } from "pg-boss";

export const createBoss = (url: string) => {
  return new PgBoss(url);
};
