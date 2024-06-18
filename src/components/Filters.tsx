import { Button, HStack } from '@chakra-ui/react';

interface FilterProps {
  filter: string;
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

const Filters = ({ filter, handleFilterClick }: FilterProps) => {
  return (
    <HStack flexWrap="wrap">
      {filters.map(({ label, value }) => (
        <Button
          variant="outline"
          onClick={() => handleFilterClick(value)}
          isActive={value === filter}
          key={value}
          data-testid={`filter-${value}`}
        >
          {label}
        </Button>
      ))}
    </HStack>
  );
};

export default Filters;
