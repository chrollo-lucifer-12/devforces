import type { NextConfig } from "next";
import { ClientEnvSchema, ServerEnvSchema } from "@repo/validator";

(() => {
  const combine = ClientEnvSchema.extend(ServerEnvSchema.shape);
  const parsed = combine.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
})();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
