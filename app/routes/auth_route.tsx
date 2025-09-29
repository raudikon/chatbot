import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { server_auth } from '../server/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
    return server_auth.handler(request)
}
export async function action({ request }: ActionFunctionArgs) {
    return server_auth.handler(request)
}