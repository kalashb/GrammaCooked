// TagsList.tsx
import React from 'react';
import { Tag, TagLabel, TagCloseButton, TagProps, VStack } from '@chakra-ui/react';

interface TagsListProps {
    tags: string[];
    onDeleteTag: (tag: string) => void;
}

const TagsList: React.FC<TagsListProps> = ({ tags, onDeleteTag }) => {
    return (
        <VStack spacing={2} align="start">
            {tags.map((tag, index) => (
                <Tag key={index} size="md" colorScheme="teal">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => onDeleteTag(tag)} />
                </Tag>
            ))}
        </VStack>
    );
};

export default TagsList;