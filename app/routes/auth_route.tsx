import { authClient } from "../server/auth.server"; //import the auth client

export default function Auth_Route() {
    console.log('accessing /api/auth/* route')
    return (
        <div>
            <h2>Ooh. somebodys doin a lil.. LOGGING IN...</h2>
        </div>

    );
}

