import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { server_auth } from '../../server/auth.server';
import { redirect } from 'react-router';


// export async function loader({ request }: LoaderFunctionArgs) {
//     console.log("Running loader")
//     const session = await server_auth.api.getSession({
//         headers: request.headers
//     })

//     if (session?.user) {
//         console.log("Chat actions doesn't see no user!")
//         return { user: session.user }
//     }
//     else {
//         throw redirect('/login')
//     }
// }

/*
* Scout's Notes 
- Asynchronous function that makes a POST request, accepting 1 argument. The argument is of type Request and that comes from fetch API 
- Destructured { messages } is of type UIMessage[] (why are we doing type declarations this way, why are we awaiting req.json)
- convertToModelMessages converts UIMessage to ModelMessage objects, why are we doing that. 
*/
export const maxDuration = 30; //allow streaming responses up to 30s
export async function action({ request }: ActionFunctionArgs) {

    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: openai('gpt-4o'),
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}

