import { useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  type ThemeOptions,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSettings } from "@/contexts/settings/use-settings";
import { createPalette } from "./palette";
import { createPresets } from "./presets";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const settings = useSettings();

  const presets = createPresets(settings.themeColorPresets);
  const palette = createPalette(settings.themeMode);

  const value: ThemeOptions = useMemo(
    () => ({
      palette: { ...palette, ...presets.palette },
      shape: { borderRadius: 8 },
    }),
    [palette, presets.palette],
  );

  const theme = createTheme(value);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
