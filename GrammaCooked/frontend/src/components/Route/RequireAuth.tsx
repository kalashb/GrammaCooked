import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import {Route, Navigate, useNavigation, useLocation, useNavigate} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../firebase/firebase";
import {User} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth"

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

