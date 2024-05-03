import { useState } from "react";
import { AuthContextProvider } from "./contexts/auth/auth-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./router";
import { RouterProvider } from "react-router-dom";
import { SettingsContextProvider } from "./contexts/settings/settings-provider";
import { ThemeProvider } from "./theme/theme-provider";
import type { SettingsValue } from "./contexts/settings/settings-context";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [router] = useState(() => Router());

  const defaultSettings: SettingsValue = {
    themeColorPresets: "default",
    themeMode: "light",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SettingsContextProvider defaultSettings={defaultSettings}>
          <ThemeProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </ThemeProvider>
        </SettingsContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
