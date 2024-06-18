import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface SearchProps {
  query: string;
  options: string[];
  setQuery: (value: string) => void;
}

const Search = ({ query, options, setQuery }: SearchProps) => {
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleQueryChange = (option: string, close = true) => {
    setQuery(option);
    if (close) {
      setListVisible(false);
    }
  };

  const handleKeyDown = (key: string, option: string, isLast: boolean) => {
    if (key === 'Enter') {
      handleQueryChange(option);
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
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          data-testid="search-input"
          ref={inputRef}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value, false)}
          placeholder="Search by rocket name"
          onFocus={() => setListVisible(true)}
          onKeyDown={(e) => handleInputKeyDown(e.key)}
        />
        {!!query.length && (
          <InputRightElement>
            <CloseButton
              color="gray.500"
              onClick={() => handleQueryChange('')}
              data-testid="search-clear"
            />
          </InputRightElement>
        )}
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
              onClick={() => handleQueryChange(option)}
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
