import { useState } from "react";
import { AuthContextProvider } from "./contexts/auth/auth-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./router";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [router] = useState(() => Router());

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}  />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
