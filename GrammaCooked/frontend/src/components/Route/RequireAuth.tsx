import React, {ReactElement, ReactNode} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../firebase/firebase.ts";

interface AuthenticatedRouteProps {
    children: ReactNode
}


const RequireAuth: React.FC<AuthenticatedRouteProps>  = ({ children }) => {

    const [user] = useAuthState(auth);

    if (!user) {

        return <Navigate to="/" />;
    }

    return children;
};

export default RequireAuth;

