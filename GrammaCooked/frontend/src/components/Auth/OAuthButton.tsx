import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase.ts';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    // const createUserDocument = async (user: User) => {
    //     const userDocRef = doc(firestore, 'users', user.uid);
    //     await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    // }

    // useEffect(() => {
    //     if (userCred) {
    //         createUserDocument(userCred.user);
    //     }
    // }, [userCred])

    // Continue with Google button
    return (
        <Flex direction="column" width="100%" mb={1}>
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