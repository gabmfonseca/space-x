import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface SearchProps {
  query: string;
  options: string[];
  handleQueryChange: (value: string) => void;
}

const Search = ({ query, options, handleQueryChange }: SearchProps) => {
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (value: string) => {
    handleQueryChange(value);
  };

  const handleOptionClick = (option: string) => {
    handleQueryChange(option);
    setListVisible(false);
  };

  const handleKeyDown = (key: string, option: string, isLast: boolean) => {
    if (key === 'Enter') {
      handleOptionClick(option);
    } else if (key === 'Tab' && isLast) {
      setListVisible(false);
    }
  };

  const handleInputKeyDown = (key: string) => {
    if (key === 'Enter') {
      setListVisible(false);
      inputRef.current?.blur();
    }
  };

  useOutsideClick({
    ref: searchRef,
    handler: () => setListVisible(false),
  });

  return (
    <Box pos="relative" ref={searchRef}>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search by rocket name"
          onFocus={() => setListVisible(true)}
          onKeyDown={(e) => handleInputKeyDown(e.key)}
        />
      </InputGroup>
      {listVisible && (
        <List
          mt={1}
          border={options.length ? '1px' : 'none'}
          borderColor="gray.200"
          borderRadius="md"
          pos="absolute"
          zIndex="2"
          top="100%"
          left="0"
          w="full"
          transition="all 0.5s ease"
          bgColor="white"
          height={options.length ? 'auto' : '0'}
          overflow="hidden"
        >
          {options.map((option, index) => (
            <ListItem
              key={option}
              padding="4px"
              _hover={{ background: 'gray.100', cursor: 'pointer' }}
              onClick={() => handleOptionClick(option)}
              tabIndex={0}
              onKeyDown={(e) =>
                handleKeyDown(e.key, option, index === options.length - 1)
              }
            >
              {option}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Search;
