import { Form } from "react-router";
import { useState } from "react"

export default function SignUp() {
    console.log('accessing /login route')

    const [userInputs, setUserInputs] = useState(
        {
            username: 'testname',
            user_email: 'testemail',
            user_pw: 'testpassword'
        }
    )
    const handleSignUp = () => {
        console.log('handle sign up')
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
        </div>

    );
}
