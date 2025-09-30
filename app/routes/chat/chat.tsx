import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds

'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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

            <form
                onSubmit={e => {
                    e.preventDefault();
                    sendMessage({ text: input });
                    setInput('');
                }}
            >
                <input
                    className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={e => setInput(e.currentTarget.value)}
                />

                <button type='submit'> Send </button>
            </form>
        </div>
    );
}

/*
* Scout's Notes 
- Asynchronous function that makes a POST request, accepting 1 argument. The argument is of type Request and that comes from fetch API 
- Destructured { messages } is of type UIMessage[] (why are we doing type declarations this way, why are we awaiting req.json)
- convertToModelMessages converts UIMessage to ModelMessage objects, why are we doing that. 
*/