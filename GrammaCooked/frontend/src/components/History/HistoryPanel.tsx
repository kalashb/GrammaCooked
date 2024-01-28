// HistoryBar.tsx

import React from 'react';
import { Box, Flex, Text, VStack, useColorMode } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

interface HistoryPanelProps {
    history: string[];
    selectedItem: string;
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, selectedItem, setSelectedItem }) => {
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const onItemClick = (item: string, index: number) => {
        setSelectedItem(item);
        navigate(`/chat/${index}`)
    }

    return (
        <Box
            width="20%"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            p={2}
            borderRadius="md"
            boxShadow="md"
            position="fixed"
            left={0}
            top={0}
            bottom={0}
            zIndex={10}
        >
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold" mb={2}>
                    Chat History
                </Text>
                {history.map((item, index) => (
                    <Flex
                        onClick={() => onItemClick(item, index)}
                        borderRadius={99}
                        _hover={{backgroundColor: selectedItem === item ? 'gray' : 'lightgray'}}
                        backgroundColor={selectedItem === item ? "gray" : "transparent"}
                        cursor="pointer"
                        width="100%"
                        pt={2}
                        pb={2}
                    >
                        <Text
                            pl={3}
                        >
                            {item}
                        </Text>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export default HistoryPanel;