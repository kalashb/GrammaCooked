// TagsList.tsx
import React from 'react';
import {Tag, TagLabel, TagCloseButton, TagProps, HStack, Wrap} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
interface TagsListProps {
    tags: string[];
    onDeleteTag: (tag: string) => void;
}

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

const TagsList: React.FC<TagsListProps> = ({ tags, onDeleteTag }) => {
    return (
        <Wrap spacing={2} align="start" mt={5} >
            {tags.map((tag, index) => (
                <Tag key={index} size="md" colorScheme='purple'>
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => onDeleteTag(tag)} />
                </Tag>
            ))}
        </Wrap>
    );
};

export default TagsList;