import React from "react";
import { withAuthenticationRequired } from "react-oidc-context";

const ProtectedRoute = ({ Component }) => {
  const WrappedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => <div>Redirecting to the login page...</div>,
  });

  return <WrappedComponent />;
};

export default ProtectedRoute;
