const TagsListContainer = () => {
    return (
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
    )

}