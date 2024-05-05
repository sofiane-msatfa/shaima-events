import useMediaQuery from "@mui/material/useMediaQuery";
import { type Breakpoint, useTheme } from "@mui/material/styles";

export type MediaQuery = "up" | "down" | "between" | "only";
export type MediaQueryValue = Breakpoint | number;
export type ResponsiveValue<T extends MediaQuery> = T extends "between"
  ? [MediaQueryValue, MediaQueryValue]
  : T extends "only"
    ? Breakpoint
    : MediaQueryValue;

export const useResponsive = <T extends MediaQuery>(mediaQuery: T, value: ResponsiveValue<T>) => {
  const theme = useTheme();
  const breakpoints = theme.breakpoints;

  switch (mediaQuery) {
    case "up":
      return useMediaQuery(breakpoints.up(value as MediaQueryValue));
    case "down":
      return useMediaQuery(breakpoints.down(value as MediaQueryValue));
    case "only":
      return useMediaQuery(breakpoints.only(value as Breakpoint));
    case "between": {
      const [start, end] = value as [MediaQueryValue, MediaQueryValue];
      return useMediaQuery(breakpoints.between(start, end));
    }
  }

  return false;
};
