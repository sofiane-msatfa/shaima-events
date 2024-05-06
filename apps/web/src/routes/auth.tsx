import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import { SplashScreen } from "@/components/splash-screen";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "login", lazy: () => import("@/pages/auth/login") },
      { path: "register", lazy: () => import("@/pages/auth/register") },
    ],
  },
];
