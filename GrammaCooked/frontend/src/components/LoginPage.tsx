import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import AuthPanel from "./Auth/AuthPanel.tsx";
import { Flex } from '@chakra-ui/react';
 
const LoginPage = () => {
    return (
        <Flex
            height="100vh"
            width="100%"
            align="center"
            justify="center"
        >
             <AuthPanel />
        </Flex>
    )
}
 
export default LoginPage;