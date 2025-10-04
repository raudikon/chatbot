// import { Button } from "../../shadcn/button"
// import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
// import { server_auth } from '../../server/auth.server';
// import { redirect, Link, useLoaderData, Form } from 'react-router';
// import { useChat } from '@ai-sdk/react';
// import { useState } from 'react';
// import { authClient } from "../../lib/authClient";
// import { Octokit } from 'octokit'
// import { db } from "../../db/db";
// import { eods } from "../../db/auth-schema";
// import { getPullReqs } from "./getprs";
// import { Label } from "@radix-ui/react-label";
// import { CopyButton } from "../../shadcn/index";
// import { Input } from "../../shadcn/input";
// import {
//     Card,
//     CardAction,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "../../shadcn/card"

// import { Textarea } from "../../shadcn/textarea";
// import { Copy } from "lucide-react";

// export async function loader({ request }: LoaderFunctionArgs) {

//     const prsRes = await getPullReqs(request)

//     //Protect chat endpoint 
//     const bauth_session = await server_auth.api.getSession({
//         headers: request.headers
//     })
//     if (bauth_session?.user) {
//         return { user: bauth_session.user, prs: prsRes.data }
//         // return { user: session.user}
//     }
//     else {
//         throw redirect('/login')
//     }
// }

// export async function action({ request }: ActionFunctionArgs) {

//     console.log("Running chat actions ")
//     const bauth_session = await server_auth.api.getSession({
//         headers: request.headers
//     })

//     const user_input = await request.text()

//     const insert = db.insert(eods).values({
//         userId: bauth_session?.session.userId,
//         userinput: user_input
//     }).returning()

//     return insert

// }
// //EOD Generator 
// export default function Chat() {
//     const [input, setInput] = useState('');
//     const { messages, sendMessage } = useChat();
//     let { user, prs } = useLoaderData<typeof loader>()

//     const updateDb = async (input: string) => {

//         const res = await fetch("http://localhost:5173/chat", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ input: input }),
//         });

//         if (!res.ok) {
//             throw new Error("Failed to send message");
//         }

//     }

//     return (
//         <div className= "flex z-10 h-full w-full justify-center items-center gap-10 bg" >

//         <div className="flex size-full justify-center items-center" >
//             <Card className="flex w-4/5 h-4/5" >

//                 <CardHeader>
//                 <CardTitle className="text-center text-4xl" > Your Thoughts...</CardTitle>
//                     </CardHeader>

//                     < CardContent className = "flex flex-col w-full h-full items-center justify-center" >
//                         <Form className="flex flex-col w-full h-full items-center justify-center gap-4" >
//                             <Textarea className="w-5/6 h-5/6 resize-none" placeholder = "Was today a good day?" />
//                                 <Button className="w-1/3" variant = "outline" > Get My EOD </Button>
//                                     </Form>
//                                     </CardContent>


//                                     </Card>

//                                     </div>

//                                     < div className = "flex size-full justify-center items-center" >
//                                         <Card className="w-4/5 h-4/5" >

//                                             <CardHeader>
//                                             <CardTitle className="text-center text-4xl" > Generated EOD </CardTitle>
//                                                 </CardHeader>

//                                                 < CardContent className = "flex flex-col w-full h-full items-center justify-center" >
//                                                     <Form className="flex flex-col w-full h-full items-center justify-center gap-4" >
//                                                         <Textarea className="w-5/6 h-5/6 resize-none" placeholder = {
//                                                             prs.map((pr: any) => <p>{ pr.title } { pr.url } < /p>)} / >
//                                                                 <CopyButton
//                                 variant="outline"
//                                 content = { input }
//                                 onCopy = {() => console.log("Copyninja")}
//                                                             />
//                                                             </Form>
//                                                             </CardContent>


//                                                             </Card>
//                                                             </div>


//                                                             </div>
//     );
// }

