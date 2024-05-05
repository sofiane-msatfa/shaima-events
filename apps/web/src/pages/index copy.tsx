import { useAuth } from "@/contexts/auth/use-auth";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { useSettings } from "@/contexts/settings/use-settings";
import { Typography, Button, AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Badge, Avatar, Container, Grid, styled } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React, { useState } from "react";

const StyledButton = styled(Button)({
  backgroundColor: 'transparent',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const settings = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
  };

  const fetchProtectedMessage = async () => {
    const response = await api.get("/protected");
    console.log(response.data);
  };

  const renderLinks = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" component={Link} to="/auth/login">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component={Link} to="/auth/register">
            Register
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ mr: 2 }}>
            <IconButton onClick={() => settings.toggleThemeMode()} color="inherit">
              <Brightness4Icon />
            </IconButton>
          </Box>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 1 }}>
              <StyledButton component={Link} to="/events">
                Accueil
              </StyledButton>
            </Box>
          )}
          {isAuthenticated && (
            <Box sx={{ ml: 2 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color="success"
              >
                <Avatar alt="User Avatar" src="../assets/1.jpg" onClick={handleAvatarClick} />
              </Badge>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography component="h1" variant="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the home page!
        </Typography>
        {isAuthenticated ? (
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button type="button" onClick={fetchProtectedMessage} variant="contained">
                Fetch Protected Message
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" onClick={logout} variant="contained">
                Logout
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" onClick={() => api.post("/auth/refresh")} variant="contained">
                Refresh accessToken
              </Button>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              You are not logged in
            </Typography>
            {renderLinks()}
          </>
        )}
      </Container>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
