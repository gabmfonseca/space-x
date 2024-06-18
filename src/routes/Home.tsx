import { Container, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllLaunches } from '../api/launches';
import { Launch } from '../api/types';
import Filters, { Filter } from '../components/Filters';
import LaunchCard from '../components/LaunchCard';
import Layout from '../components/Layout';
import Search from '../components/Search';

interface LoaderData {
  launches: Launch[];
  rockets: string[];
}

export const loader = async (): Promise<LoaderData> => {
  const launches = await getAllLaunches();
  const rockets = Array.from(
    new Set(launches.map(({ rocketName }) => rocketName))
  );
  return { launches, rockets };
};

const filterRockets = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase());

const filterLaunches = (
  upcoming: boolean,
  success: boolean,
  filter: string
): boolean => {
  switch (filter) {
    case 'success':
      return success;
    case 'upcoming':
      return upcoming;
    case 'past':
      return !upcoming;
    default:
      return true;
  }
};

const Home = () => {
  const { launches, rockets } = useLoaderData() as LoaderData;
  const [results, setResults] = useState<Launch[]>([]);
  const [rocketOptions, setRocketOptions] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const filteredRockets = rockets.filter((rocket) =>
      filterRockets(rocket, query)
    );
    setRocketOptions(filteredRockets);
  }, [query, rockets]);

  useEffect(() => {
    let filteredLaunches = launches
      .filter(({ rocketName }) => filterRockets(rocketName, query))
      .filter(({ upcoming, success }) =>
        filterLaunches(upcoming, success, filter)
      );

    setResults(filteredLaunches);
  }, [query, filter, launches]);

  return (
    <Layout>
      <Container mb="10">
        <Stack spacing="4">
          <Search options={rocketOptions} query={query} setQuery={setQuery} />
          <Filters filter={filter} handleFilterClick={setFilter} />
        </Stack>
      </Container>

      {!results.length ? (
        <Text>No results found</Text>
      ) : (
        <SimpleGrid spacing="10" columns={[1, null, 3]}>
          {results.map((launch) => (
            <LaunchCard {...launch} key={launch.id} />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default Home;
