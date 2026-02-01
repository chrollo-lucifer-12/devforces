import { z } from "zod";

export const BaseEnvSchema = z.object({
  NODE_ENV: z.string(),
});

export const BetterAuthEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),
});

export const GitHubOAuthEnvSchema = z.object({
  GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID is required"),
  GITHUB_CLIENT_SECRET: z.string().min(1, "GITHUB_CLIENT_SECRET is required"),
});

export const DatabaseEnvSchema = z.object({
  DATABASE_URL: z.string(),
});

export const EnvSchema = BaseEnvSchema.extend(BetterAuthEnvSchema.shape)
  .extend(GitHubOAuthEnvSchema.shape)
  .extend(DatabaseEnvSchema.shape);

export type CombinedEnvConfig = z.infer<typeof EnvSchema>;
