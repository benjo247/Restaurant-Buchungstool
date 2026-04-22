import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL fehlt. Bitte in Vercel unter Environment Variables setzen.");
}

export const sql = neon(databaseUrl);
