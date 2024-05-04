import { Navigate, createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./routes/auth";
import { commonRoutes } from "./routes/common";
import { eventRoutes } from "./routes/events";
import Home from "./pages";
import { RootLayout } from "./components/layouts/root-layout";

export default function Router() {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout>
          <Home />
        </RootLayout>
      ),
    },
    ...commonRoutes,
    ...authRoutes,
    ...eventRoutes,
    // no match
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
