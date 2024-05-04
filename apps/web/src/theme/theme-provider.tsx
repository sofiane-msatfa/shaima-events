import { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider as MuiThemeProvider, type ThemeOptions } from "@mui/material/styles";
import { useSettings } from "@/contexts/settings/use-settings";
import { createPalette } from "./palette";
import { createPresets } from "./presets";
import { createCustomShadows } from "./custom-shadows";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const settings = useSettings();

  const presets = createPresets(settings.themeColorPresets);
  const palette = createPalette(settings.themeMode);
  const customShadows = createCustomShadows(settings.themeMode);

  const value: ThemeOptions = useMemo(
    () => ({
      palette: { ...palette, ...presets.palette },
      customShadows: { ...customShadows, ...presets.customShadows },
      shape: { borderRadius: 8 },
    }),
    [palette, presets, customShadows],
  );

  const theme = createTheme(value);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
