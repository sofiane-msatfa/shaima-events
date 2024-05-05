import { useAuth } from "@/contexts/auth/use-auth";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import { useSettings } from "@/contexts/settings/use-settings";
import { Typography, Button } from "@mui/material";
import { MapboxComponent } from "@/components/mapbox";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();
  const settings = useSettings();

  const fetchProtectedMessage = async () => {
    const response = await api.get("/protected");
    console.log(response.data);
  };

  const renderLinks = () => {
    return (
      <ul>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li>
          <Link to="/auth/register">Register</Link>
        </li>
      </ul>
    );
  };

  return <MapboxComponent />

  // return (
  //   <div>
  //     <Typography component="h1" variant="h1">
  //       Home Page
  //     </Typography>
  //     <Typography>Welcome to the home page!</Typography>
  //     <Button type="button" onClick={() => settings.toggleThemeMode()}>
  //       Toggle Theme Mode
  //     </Button>
  //     {isAuthenticated ? (
  //       <>
  //         <Button type="button" onClick={fetchProtectedMessage}>
  //           Fetch Protected Message
  //         </Button>
  //         <Button type="button" onClick={logout}>
  //           Logout
  //         </Button>
  //         <Button type="button" onClick={() => api.post("/auth/refresh")}>
  //           Refresh accessToken
  //         </Button>
  //       </>
  //     ) : (
  //       <>
  //         <p>You are not logged in</p>
  //         {renderLinks()}
  //       </>
  //     )}
  //   </div>
  // );
}
