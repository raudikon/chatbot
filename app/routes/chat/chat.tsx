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
import { getPullReqs } from "./getprs";

export async function loader({ request }: LoaderFunctionArgs) {

    const bauth_session = await server_auth.api.getSession({
        headers: request.headers
    })

    const oauth_token = await authClient.getAccessToken({
        providerId: 'github',
        accountId: bauth_session?.session.userId
    })

    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
        auth: oauth_token.data?.accessToken,
        auto_paginate: true,
    })

    // get the data from github
    // const prsRes = await octokit.request(`GET /repos/${bauth_session?.user.name}/tictactoe/pulls/3`, {
    //     owner: 'raudikon',
    //     repo: 'REPO',
    //     headers: {
    //         'X-GitHub-Api-Version': '2022-11-28',
    //         'accept': 'application/json'
    //     }
    // })

    const prsRes = await getPullReqs(request)


    if (bauth_session?.user) {
        return { user: bauth_session.user, prs: prsRes.data }
        // return { user: session.user}
    }
    else {
        throw redirect('/login')
    }
}

export async function action({ request }: ActionFunctionArgs) {

    console.log("Running chat actions ")
    const bauth_session = await server_auth.api.getSession({
        headers: request.headers
    })

    const user_input = await request.text()

    const insert = db.insert(eods).values({
        userId: bauth_session?.session.userId,
        userinput: user_input
    }).returning()

    return insert

}
//EOD Generator 
export default function Chat() {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    let { user, prs } = useLoaderData<typeof loader>()

    const updateDb = async (input: string) => {

        const res = await fetch("http://localhost:5173/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: input }),
        });

        if (!res.ok) {
            throw new Error("Failed to send message");
        }
        // const data = await res.json();
        // console.log("Response:", data);
    }

    return (
        <div className="">
            <h1> How was your day?</h1>
            {user ? <p>Hi, {user.name} thanks for logging in </p> : <p>No one is logged in</p>}
            {messages.map(message => (
                <div key={message.id} className="whitespace-pre-wrap">
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.parts.map((part, i) => {
                        switch (part.type) {
                            case 'text':
                                return <div key={`${message.id}-${i}`}>{part.text}</div>;
                        }
                    })}
                </div>
            ))}

            <Form
                onSubmit={e => {
                    e.preventDefault();
                    sendMessage({ text: input });
                    setInput('');
                    updateDb(input);
                    //save to db 
                }}
            >
                <input
                    className=''
                    value={input}
                    placeholder="Say something..."
                    onChange={e => setInput(e.currentTarget.value)}
                />

                <Button type='submit'> Generate EOD </Button>
            </Form>



            <Link to='/'>
                <Button>Back Home</Button>
            </Link>

            <div>
                <p>pull requests.</p>
                {prs.map((pr: any) => <p>{pr.title} {pr.url}</p>)}
            </div>
        </div>
    );
}

