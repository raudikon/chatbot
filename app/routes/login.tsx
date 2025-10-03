import { Form, useActionData } from "react-router";
import { use, useState } from "react"
import { Link } from "react-router";
import { authClient } from "../lib/authClient";
import { Button } from "../shadcn/button";

type Login = {
    email: string,
    password: string
}


import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../shadcn/card"

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
        <div className="relative z-10 flex h-full w-full justify-center items-center bg/20 ">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle className="text-center text-4xl">EOD Generator</CardTitle>
                    <CardDescription className="text-center text-lg">Please sign up or Log In</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form onSubmit={signIn}>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={log_in.email}
                            onChange={(e) => setLogin({ ...log_in, email: e.target.value })}
                        />
                        <input
                            name="password"
                            type="text"
                            placeholder="Password"
                            value={log_in.password}
                            onChange={(e) => setLogin({ ...log_in, password: e.target.value })}
                        />
                        <Button variant="outline" type="submit">Log In</Button>
                    </Form>

                    <Link to='/signup'>
                        <Button variant="outline"  >No Account? Sign Up!</Button>
                    </Link>

                    <Link to='/'>
                        <Button variant="outline" >Back to home</Button>
                    </Link>

                    <Button variant="outline" onClick={signInGH}>GitHub Sign In</Button>
                </CardContent>

            </Card>
        </div>
    );
}
