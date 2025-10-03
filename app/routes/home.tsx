import { Link } from "react-router"
import { server_auth } from '../server/auth.server';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { useLoaderData } from "react-router";
import { Button } from "../shadcn/button";
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
    else {
        throw redirect('/login')
    }

}
export default function Home() {
    let user = useLoaderData<typeof loader>()

    return (
        <div className="h-screen w-screen relative overflow-hidden">
            {/* Background video */}
            <video
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/pexels-bgvid.mp4" type="video/mp4" />
            </video>

            {/* Centered card */}
            <div className="relative z-10 flex h-full w-full justify-center items-center">
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle className="text-center">EOD Generator</CardTitle>
                        <CardDescription className="text-center">Organize Your Thoughts</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-col gap-2">
                        <Link to="/chat">
                            <Button variant="outline" className="w-full">Begin</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
