import {ChakraProvider, Switch} from '@chakra-ui/react'
import LoginPage from './components/LoginPage.tsx'
import AuthPanel from "./components/Auth/AuthPanel";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import AuthenticatedRoute from "./components/Route/RequireAuth.tsx";
import RequireAuth from './components/Route/RequireAuth.tsx';
import HomePage from './components/HomePage.tsx';
import React, { useState } from 'react';
import { CSSReset, Box, Heading, Input, Button } from '@chakra-ui/react';
import TagsList from './TagsList';

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null); // Using null as a default value
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box maxW="600px" m="auto" mt={10}>
        <Heading mb={4}>Tags List Example</Heading>

        {/* Upload Image Input */}
        <Input type="file" mb={4} onChange={handleFileChange} />

        {/* Add Tag Section */}
        <Input
          placeholder="Add a new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          mr={2}
        />
        <Button onClick={handleAddTag} colorScheme="teal" mr={2}>
          Add Tag
        </Button>

        {/* Tags List */}
        <TagsList tags={tags} onDeleteTag={handleDeleteTag} />

        {/* Display selected file information */}
        {selectedFile && (
          <Box mt={4}>
            <strong>Selected File:</strong> {selectedFile.name}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;
