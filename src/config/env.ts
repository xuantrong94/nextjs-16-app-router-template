import { z } from "zod";

const envSchema = z.object({
  // Client-side variables (Phải có NEXT_PUBLIC_)
  NEXT_PUBLIC_API_URL: z.url(),

  // Server-side variables
  DATABASE_URL: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.treeifyError(_env.error)
  );
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
