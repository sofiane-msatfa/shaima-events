import { RootLayout } from "@/components/layouts/root-layout";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";

export const eventRoutes: RouteObject[] = [
  {
    path: "events",
    element: (
      <RootLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </RootLayout>
    ),
    children: [{ index: true, lazy: () => import("@/pages/events/root") }],
  },
];
