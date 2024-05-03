import { useLocalStorage } from "@/hooks/use-local-storage";
import type {
  SettingsValue,
  SettingsContextType,
  ThemeColorPresets,
} from "./settings-context";
import { SettingsContext } from "./settings-context";
import { useMemo } from "react";
import type { PaletteMode } from "@mui/material";

interface SettingsProviderProps {
  children: React.ReactNode;
  defaultSettings: SettingsValue;
}

export function SettingsContextProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  const setThemeMode = (mode: PaletteMode) => {
    const updatedSettings = { ...settings, themeMode: mode };
    setSettings(updatedSettings);
  };

  const toggleThemeMode = () => {
    const updatedSettings = {
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    } as const;
    setSettings(updatedSettings);
  };

  const setThemeColorPresets = (color: ThemeColorPresets) => {
    const updatedSettings = { ...settings, themeColorPresets: color };
    setSettings(updatedSettings);
  };

  const value: SettingsContextType = useMemo(
    () => ({
      ...settings,
      setThemeMode,
      toggleThemeMode,
      setThemeColorPresets,
    }),
    [settings, setThemeMode, toggleThemeMode, setThemeColorPresets],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
