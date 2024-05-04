import { Suspense } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import { Component as EventPage } from "@/pages/event/Event";


export const eventRoutes: RouteObject[] = [
  {
    path: "events",
    element: (
      <Suspense fallback={<div>Chargement...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "", element: <EventPage /> },
    ],
  },
];
