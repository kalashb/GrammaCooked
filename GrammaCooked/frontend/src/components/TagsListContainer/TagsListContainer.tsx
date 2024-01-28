import React, { ChangeEvent, useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import TagsList from "./TagsList.tsx";

const TagsListContainer = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newTag, setNewTag] = useState("");
    const [message, setMessage] = useState('');

    const handleAddTag = () => {
        if (newTag.trim() !== '' && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleDeleteTag = (tag: string) => {
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);

                reader.onload = async () => {
                    const base64Data = reader.result?.toString().split(',')[1];

                    console.log(base64Data);

                    // Send the image data to the backend
                    const response = await axios.post('http://127.0.0.1:5000/generate', {
                        imageData: base64Data,
                    });

                    let message = "";

                    // Handle the response from the backend
                    let filteredResult: string[] = [];
                    if (response.data) {
                        filteredResult = response.data
                            .filter((item: { ingredient: string, value: number }) => item.value > 0.15)
                            .map((item: { ingredient: string, value: number }) => item.ingredient);
                    } else {
                        message = "No ingredients detected!";
                    }

                    if (filteredResult.length > 0) {
                        message = "Analysis Successful!";
                        setTags(tags.concat(filteredResult));
                    } else {
                        message = "No ingredients detected!";
                    }
                    setMessage(message);
                };
            } catch (error) {
                console.error('Error processing image:', error);
                setMessage("Analysis Failed!")
            }
        }
    };

    return (
        <Box maxW="600px" m="auto" mt={10}>
            <Heading>Meet Your Personal AI-Powered Kitchen Assistant</Heading>
            <Text textAlign="center">Simply type some ingredients you have on hand or scan a picture, and GrammaCooked will instantly generate an all-new recipe on demand...</Text>

            {/* Tags List */}
            <TagsList tags={tags} onDeleteTag={handleDeleteTag} />

            {/* Add Tag Section */}
            <Flex
                mt={5}
                mb={5}
            >
                <Input
                    placeholder="Add a new tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    mr={2}
                />
                <Button onClick={handleAddTag} colorScheme="teal" mr={2}>
                    Add Tag
                </Button>
            </Flex>

            {/* Upload Image Input */}
            <Flex>
                <Input type="file" mb={4} onChange={handleFileChange} mr={2} />
                <Button onClick={handleUpload} colorScheme="teal" mr={2}>
                    Analyze
                </Button>
            </Flex>
            {message === "Analysis Successful!" ?
                <Text mt={1} color="green">{message}</Text> :
                <Text mt={1} color="red">{message}</Text>
            }
            <Flex
                mt={2}
                width="100%"
                align="center"
                justify="center"
            ><Button colorScheme="teal" >Generate Recipe</Button>
            </Flex>

        </Box>
    )
}

export default TagsListContainer;