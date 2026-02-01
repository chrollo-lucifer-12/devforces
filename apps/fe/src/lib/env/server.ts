import "server-only";
import { ServerEnvSchema } from "@repo/validator";

const envToParse = { ...process.env };
delete envToParse.NEXT_PUBLIC_BETTER_AUTH_URL;

const parsed = ServerEnvSchema.safeParse(envToParse);

if (!parsed.success) {
  console.error("Invalid server environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}
export const env = parsed.data;
