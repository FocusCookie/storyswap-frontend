import React, { useEffect } from "react";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Login = ({ ...props }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((res) => console.log(res));
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="login-view">
      hallo login
      <br />
      <button onClick={() => loginWithRedirect()}>Login</button>
    </div>
  );
};
