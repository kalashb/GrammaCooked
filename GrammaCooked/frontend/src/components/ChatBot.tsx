
import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    VStack,
    HStack,
    Text,
    extendTheme
} from '@chakra-ui/react';

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
    const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
    const sendMessage = async (userInput: string) => {
        try {
            const response = await fetch('http://localhost:5000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Update your state or context with the response to display the message
            console.log(data.message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    
    // ... sendMessage and other functions ...

    return (
        <ChakraProvider theme={theme}>
            <VStack
                spacing={4}
                p={5}
                boxShadow="md"
                borderRadius="lg"
                bgColor="purple.600"
                color="white"
                align="stretch"
            >
                <VStack
                    w="full"
                    h="950px"
                    p={3}
                    spacing={3}
                    overflowY="auto"
                    bg="purple.200"
                    borderRadius="lg"
                >
                    {messages.map((message, index) => (
                        <HStack key={index} alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                            <Box bg={message.sender === 'user' ? 'purple.200' : 'purple.300'}>
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
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        bgColor="white"
                        color="purple.800"
                    />
                    <Button colorScheme="purple" onClick={sendMessage}>Send</Button>
                </HStack>
            </VStack>
        </ChakraProvider>
    );
};

export default ChatBot;
