import { Button } from "../../shadcn/button"
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { server_auth } from '../../server/auth.server';
import { redirect, Link, useLoaderData, Form } from 'react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { authClient } from "../../lib/authClient";
import { Octokit } from 'octokit'
import { db } from "../../db/db";
import { eods } from "../../db/auth-schema";
import { account } from "../../db/auth-schema";
import { eq } from 'drizzle-orm';

export const getPullReqs = async (request: Request) => {

    const bauth_session = await server_auth.api.getSession({
        headers: request.headers
    })

    const USER_ID = bauth_session?.session.userId || 'yogurt'
    // const oauth_token = await authClient.getAccessToken({
    //     providerId: 'github',
    //     accountId: bauth_session?.session.userId
    // })


    const oauth_token = await db
        .select({ accessToken: account.accessToken }) // pick only accessToken
        .from(account)
        // .where(account.userId.eq(USER_ID));
        .where(eq(account.userId, USER_ID))


    const octokit = new Octokit({
        auth: oauth_token[0].accessToken,
        auto_paginate: true,
    })

    const USERNAME = bauth_session?.user.name

    //access this by prs.data.title , prs.data.created_by 
    let pullreqs = await octokit.request(`GET /repos/${USERNAME}/{repo}/pulls?state=all`,
        {
            // owner: 'raudikon',
            repo: 'chatbot',
            headers:
            {
                'X-GitHub-Api-Version': '2022-11-28',
                'accept': 'application/json',
                'authorization': `Bearer ${oauth_token}`
            },
        })

    return pullreqs
}

// `GET /issues?q=is%3Apr+author%3A${USERNAME}+archived%3Afalse+is%3Aclosed+updated%3A%3E2025-09-29`
// https://github.com/issues?q=is%3Apr+author%3Araudikon+archived%3Afalse+is%3Aclosed+updated%3A%3E2025-09-29

