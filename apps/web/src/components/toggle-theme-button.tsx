import { useSettings } from "@/contexts/settings/use-settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

export function ToggleThemeButton() {
  const { themeMode, toggleThemeMode } = useSettings();

  return (
    <IconButton onClick={toggleThemeMode} color="inherit">
      {themeMode === "dark" ? <LightModeIcon color="action" /> : <DarkModeIcon color="action"/>}
    </IconButton>
  );
}
