import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth/use-auth";
import { ToggleThemeButton } from "../toggle-theme-button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "My events", path: "/events/my-events" },
];

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenPopover(e.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const avatar = isAuthenticated ? (
    <Box sx={{ ml: 2, float: "right" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color="success"
      >
        <Avatar alt="User Avatar" src="@/assets/1.jpg" onClick={handleOpenPopover} />
      </Badge>
    </Box>
  ) : null;

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "background.default",
          boxShadow: (theme) => theme.customShadows.z4,
        }}
      >
        <Toolbar disableGutters component="nav">
          <Container sx={{ height: 1 }}>
            <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }} justifyContent="space-between">
              <Box>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    sx={{ color: "text.primary" }}
                    component={Link}
                    to={item.path}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
              <Box>
                <ToggleThemeButton />
                {avatar}
              </Box>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={openPopover} open={!!openPopover} onClose={handleClosePopover}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
