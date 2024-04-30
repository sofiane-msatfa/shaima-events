import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const STRING = z.string().min(1);
const NUMBER = z.coerce.number();
const BOOLEAN = z.enum(["true", "false"]).transform((s) => s === "true");

export const env = createEnv({
  server: {
    PORT: NUMBER.int().default(3000),
    // MONGODB_URI: STRING.url(),
    ENABLE_SWAGGER: BOOLEAN.default("false"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
