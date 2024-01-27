import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

interface HomePageProps {

}

const Homepage: React.FC<HomePageProps> = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

                    console.log(base64Data)

                    // Send the image data to the backend
                    const response = await axios.post('http://127.0.0.1:5000/generate', {
                        imageData: base64Data,
                    });

                    // Handle the response from the backend
                    console.log(response.data);
                };
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
    };

    return (
        <Flex
            height="100vh"
            width="100%"
            flexDirection="column"
            align="center"
            backgroundColor="#6a5acd"
        >
            <Heading>Meet Your Personal AI-Powered Kitchen Assistant</Heading>
            <Text textAlign="center">Simply type a recipe idea or some ingredients you have on hand and DishGen's AI will instantly generate an all-new recipe on demand...</Text>

            <div>
                <input type="file" onChange={handleFileChange} />
            </div>

            <Button
              onClick={handleUpload}
            >Generate</Button>

        </Flex>
    )
}

export default Homepage;