import { ClientEnvSchema } from "@repo/validator";

const parsed = ClientEnvSchema.safeParse({
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

if (!parsed.success) {
  console.error(
    { errors: parsed.error.format() },
    "Invalid environment configuration",
  );
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;
