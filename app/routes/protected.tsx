import { redirect, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { server_auth } from '../server/auth.server';
import { authClient } from '../lib/authClient';
import type { Route } from "../../.react-router/types/app/+types/root.ts"


export async function loader({ request }: LoaderFunctionArgs) {

    const session = await server_auth.api.getSession({
        headers: request.headers
    })

    if (session?.user) {
        return { user: session.user }
    }
    else {
        throw redirect('/')
    }

}

export async function action({ request }: ActionFunctionArgs) {
    return server_auth.handler(request)
}

export default function Protected({ loaderData }: { loaderData: { user: { email: string } } }) {

    if (!loaderData?.user) {
        return (
            <p>no loader data </p>
        )
    }

    return (
        <div>
            Ciao, {loaderData != undefined ? loaderData.user.email : "nope"}
        </div>
    )

}