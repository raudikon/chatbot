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
        // "http://localhost:5174"
        "http://localhost:5173"
    ],


    emailAndPassword:
    {
        enabled: true
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    }
});

type Login = {
    email: string,
    password: string
}

