import React from 'react';
import { Box, Button, Flex, Text, VStack, useColorMode } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

interface HistoryPanelProps {
    history: string[];
    selectedItem: string;
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, selectedItem, setSelectedItem }) => {
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const onItemClick = (item: string) => {
        setSelectedItem(item);
        navigate(`/chat/${item}`)
    }

    return (
        <Box
            width="20%"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            p={2}
            borderRadius="md"
            boxShadow="md"
        >
            <VStack align="start" spacing={2} height="93%" overflowY="auto">
                <Text fontWeight="bold" mb={2}>
                    Chat History
                </Text>
                {history.map((item, index) => (
                    <Flex
                        key={item + index}
                        onClick={() => onItemClick(item)}
                        borderRadius={99}
                        _hover={{ backgroundColor: selectedItem === item ? 'gray' : 'lightgray' }}
                        backgroundColor={selectedItem === item ? "gray" : "transparent"}
                        cursor="pointer"
                        width="100%"
                        pt={2}
                        pb={2}
                    >
                        <Text
                            pl={3}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {item}
                        </Text>
                    </Flex>
                ))}
            </VStack>
            <Box
                width="100%"
                px={8}
            >
                <Button
                    colorScheme="purple"
                    width="100%"
                    onClick={() => navigate("/home", {replace: true})}
                >Analyze</Button>
            </Box>
        </Box>
    );
};

export default HistoryPanel;