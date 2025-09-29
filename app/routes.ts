import type { RouteConfig } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";
import { userSignIn } from "./server/serverActions";

export default [
    route("login", "./routes/login.tsx"),
    route("api/auth/*", "./routes/auth_route.tsx"),
    route("signup", "./routes/signup.tsx"),
    route("protected", "./routes/protected.tsx"),


] satisfies RouteConfig;

