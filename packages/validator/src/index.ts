import { z } from "zod";

export const ServerEnvSchema = z.object({
  APP_ENV: z.string().min(1, "APP_ENV required"),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID is required"),
  GITHUB_CLIENT_SECRET: z.string().min(1, "GITHUB_CLIENT_SECRET is required"),
  DATABASE_URL: z.string(),
});

export const ClientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z
    .string()
    .min(1, { error: "url must not be empty" }),
});
