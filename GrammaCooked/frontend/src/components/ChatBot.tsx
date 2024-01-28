
import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    VStack,
    HStack,
    Text,
    extendTheme,
    Circle
} from '@chakra-ui/react';
import axios from 'axios';

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

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{ role: string; message: string }[]>([]);
    const sendMessage = async (userInput:string) => {
        if (!userInput.trim()) return;  // Prevents sending empty messages
    
        // Update UI immediately to show the user's message
        setMessages([...messages, { role: 'USER', message: userInput }]);


        if (messages.length <= 1) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/chat2', {
                    message: userInput,  // You might need to adjust this depending on the expected format of your backend
                    // Include any other data your backend expects
                });
    
                console.log(response)
        
                // Assuming your backend sends back a string to be displayed as the bot's response
                const botMessage = response.data.botMessage; // Adjust this according to the actual response structure
        
                // Update UI to show the bot's message
                setMessages((prevMessages) => [...prevMessages, { role: 'CHATBOT', message: botMessage }]);
            } catch (error) {
                console.error('There was an error sending the message: ', error);
                // Handle the error accordingly
                // Maybe display a message to the user that something went wrong
            }
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:5000/chat3', {
                    message: userInput,  // You might need to adjust this depending on the expected format of your backend
                    chat_history: messages
                    // Include any other data your backend expects
                });
    
                console.log(response)
        
                // Assuming your backend sends back a string to be displayed as the bot's response
                const botMessage = response.data.botMessage; // Adjust this according to the actual response structure
        
                // Update UI to show the bot's message
                setMessages((prevMessages) => [...prevMessages, { role: 'CHATBOT', message: botMessage }]);
            } catch (error) {
                console.error('There was an error sending the message: ', error);
                // Handle the error accordingly
                // Maybe display a message to the user that something went wrong
            }
        }
    
       
    
        // Clear the input field after sending the message
        setUserInput('');
    };
    
    // ... sendMessage and other functions ...

    return (
        <ChakraProvider theme={theme}>
            <VStack
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
                    h="950px"
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
                    <Button colorScheme="purple" onClick={() => sendMessage(userInput)}>Send</Button>
                </HStack>
            </VStack>
        </ChakraProvider>
    );
};

export default ChatBot;
