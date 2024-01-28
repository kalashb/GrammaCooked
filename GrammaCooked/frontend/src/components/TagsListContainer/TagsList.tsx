// TagsList.tsx
import React from 'react';
import {Tag, TagLabel, TagCloseButton, Wrap} from '@chakra-ui/react';

interface TagsListProps {
    tags: string[];
    onDeleteTag: (tag: string) => void;
}

const TagsList: React.FC<TagsListProps> = ({ tags, onDeleteTag }) => {
    return (
        <Wrap spacing={2} align="start" mt={5} >
            {tags.map((tag, index) => (
                <Tag key={index} size="md" colorScheme="teal">
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => onDeleteTag(tag)} />
                </Tag>
            ))}
        </Wrap>
    );
};

export default TagsList;