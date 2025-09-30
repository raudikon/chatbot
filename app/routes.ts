import type { RouteConfig } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
    route("login", "./routes/login.tsx"),
    route("api/auth/*", "./routes/auth_actions.tsx"),
    route("signup", "./routes/signup.tsx"),
    route("protected", "./routes/protected.tsx"),
    route("api/chat", "./routes/chat/chat_actions.tsx"),
    route('chat', "./routes/chat/chat.tsx")

] satisfies RouteConfig;
