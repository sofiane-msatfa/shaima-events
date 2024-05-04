import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

import { Component as Login } from "@/pages/auth/login";
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
      { path: "login", element: <Login /> },
      { path: "register", lazy: () => import("@/pages/auth/register") },
    ],
  },
];
