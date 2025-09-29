import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import * as mySchema from '../db/auth-schema'

export const server_auth = betterAuth({

    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: mySchema
    }),


    trustedOrigins: [
        "http://localhost:5174"
    ],


    emailAndPassword:
    {
        enabled: true
    }
});

type Login = {
    email: string,
    password: string
}

