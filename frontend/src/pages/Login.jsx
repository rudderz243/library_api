// calling in AuthContext so we can use the LOGIN method
import { useAuth } from "../context/AuthContext.jsx";
// calling in Navigate so we can redirect the user to the dashboard
import { Navigate, useNavigate } from "react-router-dom";

// every page needs to return a default function, so that it can be called elsewhere
export default function Login() {
  // call in our login method
  const { login } = useAuth();
  // set up for navigation
  const navigate = useNavigate();

  // then in our method to handle a new login...
  const handleLogin = () => {
    // .. we login
    login();
    // and go where we need to go
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
