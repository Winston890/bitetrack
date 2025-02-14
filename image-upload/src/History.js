import { useState } from "react";
import { useAuth } from "react-oidc-context";

const History = ({isLoggedIn}) => {
    const auth = useAuth(); // Get auth state from Cognito
    console.log(auth);
    return <div>Testing Routes</div>
}

export default History;