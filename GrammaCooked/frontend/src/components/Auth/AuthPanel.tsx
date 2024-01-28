import React from "react";
import {Card} from "@chakra-ui/react";
import OAuthButton from "./OAuthButton.tsx";

interface AuthPanelProps {
    
}

const  AuthPanel:React.FC<AuthPanelProps> = () => {
    
    return (
        <Card
            height="300px"
            width="400px"
            align="center"
            justify="center"
        >
            <OAuthButton></OAuthButton>
        </Card>
    )

}

export default AuthPanel;