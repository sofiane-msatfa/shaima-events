import { useAuth } from "@/contexts/auth/use-auth";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { Typography, Button, Box, Grid } from "@mui/material";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

  const fetchProtectedMessage = async () => {
    const response = await api.get("/protected");
    console.log(response.data);
  };

  const authenticatedLinks = (
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
  );

  const anonLinks = (
    <>
      <Typography variant="body1" gutterBottom>
        You are not logged in
      </Typography>
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
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, textAlign: "center", width: "100%" }}>
      <Typography component="h1" variant="h1" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the home page!
      </Typography>
      {isAuthenticated ? authenticatedLinks : anonLinks}
    </Box>
  );
}
