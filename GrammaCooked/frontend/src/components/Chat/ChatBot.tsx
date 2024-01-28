
import React, { useEffect, useState } from 'react';
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    VStack,
    HStack,
    Text,
    extendTheme,
    Circle,
    Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { getDocs, doc, getDoc, updateDoc } from '@firebase/firestore';
import { firestore } from '../../firebase/firebase.ts';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
    colors: {
        purple: {
            50: '#eee5f9',
            100: '#d3b7f4',
            200: '#b989ef',
            300: '#9e5bea',
            400: '#833de5',
            500: '#6920e0',
            600: '#5518b3',
            700: '#401086',
            800: '#2c0959',
            900: '#17042c',
        },
    },
    components: {
        Box: {
            baseStyle: {
                borderRadius: 'lg',
                p: '4',
                boxShadow: 'md',
            },
        },
    },
});

interface ChatBotProps {
    chatId: string
    userId: string
}

const ChatBot: React.FC<ChatBotProps> = ({ chatId, userId }) => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{ role: string; message: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const sendMessage = async (userInput: string) => {
        setIsLoading(true);
        if (!userInput.trim()) return;  // Prevents sending empty messages

        let newMessages = [...messages, { role: 'USER', message: userInput }]

        // Update UI immediately to show the user's message
        setMessages(newMessages);

        try {
            const response = await axios.post('http://127.0.0.1:5000/chat3', {
                message: userInput,  // You might need to adjust this depending on the expected format of your backend
                chat_history: messages
                // Include any other data your backend expects
            });

            console.log(response)

            // Assuming your backend sends back a string to be displayed as the bot's response
            const botMessage = response.data.botMessage; // Adjust this according to the actual response structure

            newMessages = [...newMessages, { role: 'CHATBOT', message: botMessage }]

            // Update UI to show the bot's message
            setMessages(newMessages);


            const userRef = doc(firestore, `users/${userId}/chats/${chatId}`);

            // Save the list of strings under the 'myList' key
            await updateDoc(userRef, { chat_history: newMessages, id: chatId });

        } catch (error) {
            console.error('There was an error sending the message: ', error);
            // Handle the error accordingly
            // Maybe display a message to the user that something went wrong
        }

        // Clear the input field after sending the message
        setUserInput('');
        setIsLoading(false);
    };

    const getConvo = async () => {
        if (userId) {
            const convoDoc = doc(firestore, `users/${userId}/chats/${chatId}`)

            const returnedDoc = await getDoc(convoDoc);


            const messages = returnedDoc.data()!['chat_history'];

            setMessages(messages);
        }

    }

    useEffect(() => {
        getConvo()
    }

        , [userId, chatId])

    return (
        <ChakraProvider theme={theme}>
            <VStack
                w="full"
                spacing={4}
                p={5}
                boxShadow="md"
                borderRadius="lg"
                bgColor="purple.400"
                color="white"
                align="stretch"
            >
                <VStack
                    w="full"
                    h="full"
                    p={3}
                    spacing={3}
                    overflowY="auto"
                    bg="white"
                    borderRadius="lg"
                >
                    {messages.map((message, index) => (
                        <HStack key={index} alignSelf={message.role === 'USER' ? 'flex-end' : 'flex-start'} maxWidth="65%">
                            <Box bg={message.role === 'USER' ? 'purple.100' : 'purple.100'} px={2} py={1} borderRadius={12}>
                                <Text color="purple.800">{message.message}</Text>
                            </Box>
                        </HStack>
                    ))}
                </VStack>
                <HStack w="full">
                    <Input
                        placeholder="Type a message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(userInput)}
                        bgColor="white"
                        color="purple.800"
                    />
                    <Button colorScheme="purple" onClick={() => sendMessage(userInput)} isDisabled={isLoading}>{
                        isLoading ? <Spinner /> : "Send"
                    }</Button>
                </HStack>
            </VStack>
        </ChakraProvider>
    );
};

export default ChatBot;
