import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {auth, firestore} from '../../firebase/firebase.ts';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const OAuthButtons: React.FC = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        console.log("hi")
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
        console.log("bye")
    }

    useEffect(() => {
        if (userCred) {
            console.log(userCred)
            createUserDocument(userCred.user);
            navigate("/home");
        }
    }, [userCred])

    // Continue with Google button
    return (
        <Flex direction="column" width="100%" mb={1} borderWidth="1px">
            <Button
                variant='oauth'
                mb={2}
                justifyContent='start'
                isLoading={loading}
                onClick={() => signInWithGoogle()}
            >
                <Box flex='1'><Image src='/images/googlelogo.png' height='20px' />
                </Box>
                <Text textAlign='center'>Continue with Google</Text>
                <Box flex='1'></Box>
            </Button>
            {error && <Text>{error.message}</Text>}
        </Flex>
    )
}
export default OAuthButtons;