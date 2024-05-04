import type { Theme } from "@mui/material/styles";
import merge from "lodash/merge";
import { input } from "./input";

export function componentsOverrides(theme: Theme) {
  const overrides = merge(input(theme));
  return overrides;
}
