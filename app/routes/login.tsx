import { Form, useActionData } from "react-router";
import { use, useState } from "react"
import { Link } from "react-router";
import { authClient } from "../lib/authClient";
import { Button } from "../shadcn/button";

type Login = {
    email: string,
    password: string
}

export default function Login() {

    const [log_in, setLogin] = useState<Login>(
        {
            email: '',
            password: ''
        }
    )


    const signIn = async () => {

        await authClient.signIn.email(
            {
                email: log_in.email,
                password: log_in.password,
                // callbackURL: '/protected',
                callbackURL: "/chat"
            },
            {
                onRequest: (ctx) => {
                    // show loading state
                },
                onSuccess: (ctx) => {
                },
                onError: (ctx) => {
                    alert(ctx.error.code)
                },
            },
        )
    }

    const signInGH = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/chat"
        })
    }


    return (
        <div>
            <h2>Login Component</h2>
            <Form onSubmit={signIn}>
                <input
                    name="email"
                    type="text"
                    placeholder="Enter email :)"
                    value={log_in.email}
                    onChange={(e) => setLogin({ ...log_in, email: e.target.value })}
                />
                <input
                    name="password"
                    type="text"
                    placeholder="Enter password :)"
                    value={log_in.password}
                    onChange={(e) => setLogin({ ...log_in, password: e.target.value })}
                />
                <Button type="submit">Log In</Button>
            </Form>

            <Link to='/signup'>
                <Button>No Account? Sign Up!</Button>
            </Link>

            <Link to='/'>
                <Button>Back to home</Button>
            </Link>

            <Button onClick={signInGH}>GitHub Sign In</Button>




        </div>

    );
}
