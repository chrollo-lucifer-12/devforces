import "server-only";
import { ServerEnvSchema } from "@repo/validator";
import { logger } from "../logger";
const log = logger.child({ module: "totoro" });

const envToParse = { ...process.env };
delete envToParse.NEXT_PUBLIC_BETTER_AUTH_URL;

const parsed = ServerEnvSchema.safeParse(envToParse);

if (!parsed.success) {
  log.error(
    { errors: parsed.error.format() },
    "Invalid environment configuration",
  );
  throw new Error("Invalid environment configuration");
}
export const env = parsed.data;
