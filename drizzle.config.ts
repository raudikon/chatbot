import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) throw Error("NO DATABASE URL PROVIDED!! >:(")

export default defineConfig({
    dialect: "postgresql",
    schema: "app/db/auth-schema.ts",
    out: "app/db",
    dbCredentials:
    {
        url: DATABASE_URL
    },
});

