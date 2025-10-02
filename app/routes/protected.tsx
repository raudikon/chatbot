import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { server_auth } from '../server/auth.server';
import { authClient } from '../lib/authClient';


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

export async function action({ request }: ActionFunctionArgs) {
    return server_auth.handler(request)
}

export default function Protected({ loaderData }: { loaderData: { user: { email: string } } }) {

    // const signOut = async () => {

    //     await authClient.signOut({
    //         fetchOptions: {
    //             onSuccess: () => {
    //                 redirect("/login"); // redirect to login page
    //             },
    //         },
    //     });

    // }

    if (!loaderData?.user) {
        return (
            <p>no loader data </p>
        )
    }

    return (
        <div>
            Ciao, {loaderData != undefined ? loaderData.user.email : "nope"}
            {/* <button onClick={signOut}>Signout</button> */}
        </div>

    )

}