import { onAuthStateChanged } from "firebase/auth";
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase/firebase";

interface AuthenticatedRouteProps {
    children: ReactNode
}

const RequireAuth: React.FC<AuthenticatedRouteProps>  = ({ children }) => {
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/");
        }
    })

    return (
        children
    )
};

export default RequireAuth;

