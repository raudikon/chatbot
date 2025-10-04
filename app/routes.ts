import type { RouteConfig } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [

    route('/', "./routes/home.tsx"),
    // route('/home', "./routes/home.tsx"),


    route("login", "./routes/login.tsx"),
    route("api/auth/*", "./routes/auth_actions.tsx"),
    route("signup", "./routes/signup.tsx"),

    route("protected", "./routes/protected.tsx"),

    // route("api/chat", "./routes/chat/chat_actions.tsx"),
    route("api/completion", "./routes/chat/chat_actions.tsx"),

    route('chat', "./routes/chat/chat.tsx"),

    // route('https://api.github.com/*', "./routes/github_actions.tsx")

] satisfies RouteConfig;
