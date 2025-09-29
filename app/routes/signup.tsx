import { Form, useNavigate } from "react-router";
import { useState } from "react"
import { Link } from "react-router";
import { authClient } from "../lib/authClient";

// const navigate = useNavigate()

export default function SignUp() {
    console.log('accessing /login route')

    const [userInputs, setUserInputs] = useState(
        {
            username: '',
            user_email: '',
            user_pw: ''
        }
    )
    const handleSignUp = async () => {
        const { data, error } = await authClient.signUp.email({
            email: userInputs.user_email,
            password: userInputs.user_pw,// user password -> min 8 characters by default
            name: userInputs.username, // user display name
            image: undefined, // User image URL (optional)
            callbackURL: undefined// A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                //navigate to home
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.code);
            },
        });
    }

    return (
        <div>

            <h2>Don't have an account? Sign up!</h2>

            <Form onSubmit={handleSignUp}>

                <div>
                    <input
                        name="username"
                        type="text"
                        placeholder="choose username"
                        value={userInputs.username}
                        onChange={(e) => setUserInputs({ ...userInputs, username: e.target.value })} />
                </div>

                <div>
                    <input
                        name="email"
                        type="text"
                        placeholder="acount email"
                        value={userInputs.user_email}
                        onChange={(e) => setUserInputs({ ...userInputs, user_email: e.target.value })} />
                </div>


                <div>
                    <input
                        name="password"
                        type="text"
                        placeholder="A good password"
                        value={userInputs.user_pw}
                        onChange={(e) => setUserInputs({ ...userInputs, user_pw: e.target.value })}
                    />
                    <button type="submit">Sign up with email & pw</button>
                </div>

            </Form>


            <Link to='/login'>
                <button>Click here to login in instead</button>
            </Link>


        </div>

    );
}
