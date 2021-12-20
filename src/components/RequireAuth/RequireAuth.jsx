import React from "react";
import PropTypes from "prop-types";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.element,
};
