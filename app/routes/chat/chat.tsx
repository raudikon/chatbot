import { Button } from "../../shadcn/button"

'use client';

import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { server_auth } from '../../server/auth.server';
import { redirect, Link, useLoaderData, Form } from 'react-router';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

import { Octokit } from 'octokit'

export async function loader({ request }: LoaderFunctionArgs) {

    const session = await server_auth.api.getSession({
        headers: request.headers
    })

    console.log("Token is :", session?.session.token)



    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    })

    // get the data from github
    const prsRes = await octokit.request('GET /repos/raudikon/tictactoe/pulls', {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': 'application/json'
        }
    })

    if (session?.user) {
        return { user: session.user, prs: prsRes.data }
        // return { user: session.user}
    }
    else {
        throw redirect('/login')
    }


}



//EOD Generator 
export default function Chat() {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    let { user, prs } = useLoaderData<typeof loader>()

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

            <p>pull requests. {prs.title}</p>


        </div>
    );
}

