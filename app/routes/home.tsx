import { Link, Form } from "react-router"
import { server_auth } from '../server/auth.server';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { useLoaderData } from "react-router";
import { Button } from "../shadcn/button";
import { Label } from "../shadcn/label";
import { Input } from "../shadcn/input"
import Login from "./login";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn/card"

export async function loader({ request }: LoaderFunctionArgs) {

    const session = await server_auth.api.getSession({
        headers: request.headers
    })

    if (session?.user) {
        return { user: session.user }
    }
    // else {
    //     throw redirect('/login')
    // }

}
export default function Home() {
    let user = useLoaderData<typeof loader>()

    return (
        <div className="h-screen w-screen relative overflow-hidden">

            <video
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/pexels-bgvid.mp4" type="video/mp4" />
            </video>

            {
                user ?
                    (<>
                        <div className="relative z-10 flex h-full w-full justify-center items-center bg/20 ">
                            <Card className="w-100">
                                <CardHeader>
                                    <CardTitle className="text-center text-4xl">EOD Generator</CardTitle>
                                    <CardDescription className="text-center text-lg">Welcome, {user?.user.name}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex-col gap-2">
                                    <Link to="/chat">
                                        <Button variant="outline" className="w-full">Begin</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </>) :
                    <Login />
            }

        </div>
    )
}
