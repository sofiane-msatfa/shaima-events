import type { SettingsValue } from "./contexts/settings/settings-context";

import { useState } from "react";
import Router from "./router";
import { AuthContextProvider } from "./contexts/auth/auth-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { SettingsContextProvider } from "./contexts/settings/settings-provider";
import { ThemeProvider } from "./theme/theme-provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { fr } from "date-fns/locale/fr";
import { Toaster } from "sonner";

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
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <RouterProvider router={router} />
              <ReactQueryDevtools />
              <Toaster />
            </LocalizationProvider>
          </ThemeProvider>
        </SettingsContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
