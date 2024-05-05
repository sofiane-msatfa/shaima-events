import { AuthGuard } from "@/components/guards/auth-guard";
import { RootLayout } from "@/components/layouts/root-layout";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

export const eventRoutes: RouteObject[] = [
  {
    path: "events",
    element: (
      <Suspense fallback={<SplashScreen />}>
        <RootLayout>
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        </RootLayout>
      </Suspense>
    ),
    children: [
      { index: true, lazy: () => import("@/pages/events/root") },
      { path: "my-events", lazy: () => import("@/pages/events/myevents") },
    ],
  },
];
