import {
  Form,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  Link
} from "react-router";
import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";
import Login from "./routes/login";

export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
