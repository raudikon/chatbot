import { Form, useActionData } from "react-router";
import { use, useState } from "react"
import { Link } from "react-router";
import { authClient } from "../lib/authClient";

type Login = {
    email: string,
    password: string
}

export default function Login() {
    console.log('accessing /login route')

    const [login, setLogin] = useState<Login>(
        {
            email: '',
            password: ''
        }
    )

    const handleLogin = async (login: Login) => {

        console.log('u pressed me')

        // const { data, error } = await authClient.signIn.email({
        //     email: login.email,
        //     password: login.password,
        //     callbackURL: '/userhome',
        //     rememberMe: false,
        // },
        //     {
        //         //callbacks
        //     }
        // )
    }


    return (
        <div>
            <h2>You have hit the login page</h2>
            <Form>
                <input
                    name="email"
                    type="text"
                    placeholder="Enter email :)"
                    value={login.email}
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                />
                <input
                    name="email"
                    type="text"
                    placeholder="Enter password :)"
                    value={login.password}
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                />
                <button type="submit">Log</button>
            </Form>

            <Link to='/signup'>
                <button>Click here to sign up instead</button>
            </Link>


        </div>

    );
}
