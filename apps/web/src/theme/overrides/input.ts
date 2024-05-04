import { alpha, type Theme } from "@mui/material/styles";
import { filledInputClasses, inputLabelClasses, outlinedInputClasses } from "@mui/material";

export function input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 0.6,
            color: theme.palette.text.secondary,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
          "&::placeholder": {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: 1,
          overflow: "hidden",
          // borderColor: theme.palette.neutral[theme.palette.mode === "light" ? 300 : 500],
          borderColor: alpha(theme.palette.divider, 0.32),
          transition: theme.transitions.create(["border-color", "box-shadow"]),
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: "transparent",
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: "transparent",
            borderColor: theme.palette.secondary.main,
            boxShadow: `${theme.palette.secondary.main} 0 0 0 2px`,
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: theme.palette.error.main,
            boxShadow: `${theme.palette.error.main} 0 0 0 2px`,
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // borderColor: alpha(theme.palette.divider, 0.32),
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.grey[theme.palette.mode === "light" ? 300 : 500],
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: "transparent",
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.secondary.main,
              boxShadow: `${theme.palette.secondary.main} 0 0 0 2px`,
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: theme.palette.error.main,
              boxShadow: `${theme.palette.error.main} 0 0 0 2px`,
            },
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
          "&:-webkit-autofill": {
            WebkitBoxShadow:
              theme.palette.mode === "dark"
                ? "0 0 0 100px #1e1e1e inset"
                : "0 0 0 100px #fff inset",
            WebkitTextFillColor: theme.palette.mode === "dark" ? "#fff" : "#000",
          },
        },
        notchedOutline: {
          borderColor: alpha(theme.palette.divider, 0.32),
          transition: theme.transitions.create(["border-color", "box-shadow"]),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          [`&.${inputLabelClasses.focused}`]: {
            color: theme.palette.secondary.main,
          },
          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
              [`&.${inputLabelClasses.focused}`]: {
                color: theme.palette.secondary.main,
              },
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
  };
}
