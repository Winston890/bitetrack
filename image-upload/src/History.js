import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const History = ({isLoggedIn}) => {
    const auth = useAuth(); 
    useEffect(() => {
        if (!auth.isAuthenticated) {
            auth.signinRedirect();
        }
    }, [auth.isAuthenticated]);

    if (!auth.isAuthenticated) {
        return <div>Redirecting...</div>; // Optional loading message
    }
    return <div>Testing Routes</div>
}

export default History;