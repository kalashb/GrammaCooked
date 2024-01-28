import React, { useEffect, useState } from 'react';
import HistoryPanel from "../History/HistoryPanel.tsx";
import ChatBot from "./ChatBot.tsx";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useParams } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from '@firebase/firestore';
import { auth, firestore } from '../../firebase/firebase';

interface ChatContainerProps {

};

const ChatContainer: React.FC<ChatContainerProps> = () => {
    const { id } = useParams();
    console.log(id)
    const [selectedItem, setSelectedItem] = useState<string>(id!);
    const [history, setHistory] = useState<string[]>([]);

    const [user] = useAuthState(auth);
    const [userId, setUserId] = useState("");

    const getChats = async () => {
        const chatDocs = await getDocs(collection(firestore, `users/${user?.uid}/chats`))
        const chats = chatDocs.docs.map(doc => ({ ...doc.data() }));
        const chatNames = chats.map(chat => chat.id)
        setHistory(chatNames)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                setUserId(user.uid);
            } else {
                // User is signed out
                setUserId("");
            }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        getChats()
    }, [userId])

    return (
        <Flex dir="horizontal" height="100vh" width="full">
            <HistoryPanel
                history={history}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            {history.indexOf(id!) === -1 ? <Flex width="100%" height="100%" align="center" justifyContent="center"><Text textAlign="center">Chat Not Found</Text></Flex> :
                <ChatBot chatId={id!} userId={userId}/>
            }
        </Flex>
    )
}
export default ChatContainer;