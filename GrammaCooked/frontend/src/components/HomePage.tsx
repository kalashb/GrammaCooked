import { Flex } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

interface HomePageProps {

}

const Homepage: React.FC<HomePageProps> = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setFileUrl(url);
        }
    };

    return (
        <section id="hero">
            <h1>Meet Your Personal AI-Powered Kitchen Assistant</h1>
            <p>Simply type a recipe idea or some ingredients you have on hand and DishGen's AI will instantly generate an all-new recipe on demand...</p>

            <div>
                <input type="file" onChange={handleFileInputChange} />

                {fileUrl && (
                    <div>
                        <p>Generated URL for the file: {fileUrl}</p>
                        {/* You can use fileUrl as needed, for example, display an image */}
                        <img src={fileUrl} alt="Selected File" style={{ maxWidth: '100%' }} />
                    </div>
                )}
            </div>

        </section>
    )
}

export default Homepage;