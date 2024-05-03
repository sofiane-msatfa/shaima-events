import { useAuth } from "@/contexts/auth/use-auth";
import { Link } from "react-router-dom";
import api from "@/utils/api";

export default function Home() {
  const { isAuthenticated, logout } = useAuth();

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

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      {isAuthenticated ? (
        <>
          <button type="button" onClick={fetchProtectedMessage}>
            Fetch Protected Message
          </button>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          {renderLinks()}
        </>
      )}
    </div>
  );
}
