import React from "react";
import { withAuthenticationRequired } from "react-oidc-context";
import History from "./History"; // Import your History component

const ProtectedRoute = withAuthenticationRequired(History, {
  onRedirecting: () => <div>Redirecting to the login page...</div>,
});

export default ProtectedRoute;
