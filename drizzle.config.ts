import { defineConfig } from "drizzle-kit";
import 'dotenv/config'

export default defineConfig({
    dialect: "postgresql",
    schema: "./auth-schema.ts",
    out: "./db",
    dbCredentials:
    {
        url: `postgresql://postgres.hbevpojtlhyvxzgojnnq:85sA4hffRZK5NgzM
@aws-1-us-east-2.pooler.supabase.com:6543/postgres`
    },
});


