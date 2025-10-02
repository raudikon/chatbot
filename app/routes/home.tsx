import { Link } from "react-router"
import { server_auth } from '../server/auth.server';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { useLoaderData } from "react-router";
import { Button } from "../shadcn/button";



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
        <div className="flex-col justify-center">
            <div>

            </div>
            <h1 className="text-3xl">EOD Generator</h1>
            {
                user ?
                    <div>
                        <p>Hi, {user.user.name} thanks for logging in </p>
                        <Link to="/chat">
                            <Button>EOD Generator</Button>
                        </Link>
                    </div>
                    :
                    <div>
                        <p>To use, please log in or sign up.</p>
                        <Link to='/login'>
                            <button>Log In</button>
                        </Link>

                        <Link to='/signup'>
                            <button>Sign Up</button>
                        </Link>
                    </div>
            }


        </div>
    )


}