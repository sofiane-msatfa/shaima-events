import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

// @see https://reactrouter.com/en/main/route/lazy
export const commonRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<div>Chargement...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "403", lazy: () => import("@/pages/403") },
      { path: "404", lazy: () => import("@/pages/404") },
      { path: "500", lazy: () => import("@/pages/500") },
    ],
  },
];
