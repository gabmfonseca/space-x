import { SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllLaunches } from '../api/launches';
import { Launch } from '../api/types';
import LaunchCard from '../components/LaunchCard';
import Layout from '../components/Layout';
import Search, { Filter } from '../components/Search';

export const loader = async (): Promise<Launch[]> => {
  const data = await getAllLaunches();
  return data;
};

const Home = () => {
  const allLaunches = useLoaderData() as Launch[];
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setFilteredLaunches(allLaunches);
  }, [allLaunches]);

  useEffect(() => {
    let filtered = allLaunches
      .filter(({ rocketName }) =>
        rocketName.toLowerCase().includes(search.toLowerCase())
      )
      .filter(({ upcoming, success }) => {
        if (filter === 'success') {
          return success;
        } else if (filter === 'upcoming') {
          return upcoming;
        } else if (filter === 'past') {
          return !upcoming;
        } else {
          return true;
        }
      });
    setFilteredLaunches(filtered);
  }, [search, filter, allLaunches]);

  return (
    <Layout>
      <Search
        search={search}
        filter={filter}
        handleSearch={setSearch}
        handleFilterClick={setFilter}
      />
      {!filteredLaunches.length ? (
        <Text>No results found</Text>
      ) : (
        <SimpleGrid spacing="10" columns={[1, null, 3]}>
          {filteredLaunches.map((launch) => (
            <LaunchCard {...launch} key={launch.id} />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default Home;
