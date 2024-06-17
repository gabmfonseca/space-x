import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';

interface SearchProps {
  search: string;
  filter: string;
  handleSearch: (value: string) => void;
  handleFilterClick: (value: Filter) => void;
}

const filters = [
  {
    label: 'All launches',
    value: 'all',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
  {
    label: 'Past',
    value: 'past',
  },
  {
    label: 'Successful',
    value: 'success',
  },
] as const;

export type Filter = (typeof filters)[number]['value'];

const Search = ({
  search,
  filter,
  handleSearch,
  handleFilterClick,
}: SearchProps) => {
  return (
    <Container mb="10">
      <Stack spacing="4">
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by rocket name"
          />
        </InputGroup>

        <HStack flexWrap="wrap">
          {filters.map(({ label, value }) => (
            <Button
              variant="outline"
              onClick={() => handleFilterClick(value)}
              isActive={value === filter}
              key={value}
            >
              {label}
            </Button>
          ))}
        </HStack>
      </Stack>
    </Container>
  );
};

export default Search;
