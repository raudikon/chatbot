import { Form, useActionData } from "react-router";
import { use, useState } from "react"
import { Link } from "react-router";
import { authClient } from "../lib/authClient";

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
                callbackURL: "/protected"
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


    return (
        <div>
            <h2>Please login!</h2>
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
                <button type="submit">Log</button>
            </Form>

            <Link to='/signup'>
                <button>Click here to sign up instead</button>
            </Link>




        </div>

    );
}
