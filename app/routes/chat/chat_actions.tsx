import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';

export const maxDuration = 30; //allow streaming responses up to 30s
export async function loader({ request }: LoaderFunctionArgs) {
    return 'hi'
}
export async function action({ request }: ActionFunctionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: openai('gpt-5-nano'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}