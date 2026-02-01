import { ClientEnvSchema } from "@repo/validator";
import { logger } from "../logger";
const log = logger.child({ module: "totoro" });

const parsed = ClientEnvSchema.safeParse({
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

if (!parsed.success) {
  log.error(
    { errors: parsed.error.format() },
    "Invalid environment configuration",
  );
  throw new Error("Invalid environment configuration");
}

export const env = parsed.data;
