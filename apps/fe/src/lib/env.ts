import { EnvSchema } from "@repo/validator";

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  throw new Error("Invalid environment configuration");
}
export const env = parsed.data;
