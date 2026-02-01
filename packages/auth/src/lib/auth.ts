import { betterAuth } from "better-auth";
import { DB, drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, account, admin, session } from "@repo/db";

export type AuthConfig = {
  githubClientId: string;
  githubClientSecret: string;
};

export function createAuth(config: AuthConfig, db: DB) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user,
        account,
        admin,
        session,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    socialProviders: {
      github: {
        clientId: config.githubClientId,
        clientSecret: config.githubClientSecret,
      },
    },
    appName: "Dev Forces",
  });
}

export type Auth = ReturnType<typeof createAuth>;
