import { Navigate, createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./routes/auth";
import { commonRoutes } from "./routes/common";
import { eventRoutes } from "./routes/event";
import Home from "./pages";

export default function Router() {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    ...commonRoutes,
    ...authRoutes,
    ...eventRoutes,
    // no match
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
