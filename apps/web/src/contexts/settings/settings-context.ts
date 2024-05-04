import { createContext } from "react";
import type { PaletteMode } from "@mui/material";

export type ThemeColorPresets = "default" | "cyan" | "purple" | "blue" | "orange" | "red";

export interface SettingsValue {
  themeMode: PaletteMode;
  themeColorPresets: ThemeColorPresets;
}

export interface SettingsContextType extends SettingsValue {
  setThemeMode: (mode: PaletteMode) => void;
  toggleThemeMode: () => void;
  setThemeColorPresets: (color: ThemeColorPresets) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
