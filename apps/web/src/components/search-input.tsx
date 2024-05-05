import { TextField, styled } from "@mui/material";

/** @props https://mui.com/material-ui/api/text-field/ */
export const SearchInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: 40,
    [theme.breakpoints.up("md")]: {
      width: 220,
    },
    transition: theme.transitions.create(["width"]),
    "&.Mui-focused": {
      [theme.breakpoints.up("md")]: {
        width: 280,
      },
    },
  },
}));
