import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, useLoaderData } from 'react-router-dom';
import { getLaunchDetails } from '../api/launches';
import { LaunchDetails } from '../api/types';
import CrewDetails from '../components/CrewDetails';
import Layout from '../components/Layout';
import PayloadsDetails from '../components/PayloadsDetails';
import FallbackPatch from '../fallbackPatch.png';

interface RouteParams {
  params: { id?: string };
}

export const launchLoader = async ({
  params,
}: RouteParams): Promise<LaunchDetails | null> => {
  if (params.id) {
    const data = await getLaunchDetails(params.id);
    return data;
  } else {
    return null;
  }
};

const DetailPage = () => {
  const {
    crewDetails,
    date,
    details,
    missionName,
    patchUrl,
    payloadsDetails,
    rocketName,
    success,
    upcoming,
  } = useLoaderData() as LaunchDetails;

  return (
    <Layout>
      <Link to="/">
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="gray"
          variant="outline"
        >
          Back to launches
        </Button>
      </Link>

      <Stack my="8" spacing="3">
        <Heading size="sm">Launch Details</Heading>
        <Divider />
      </Stack>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gridTemplateColumns={{ base: '1fr', md: '2fr 1fr' }}
        gap="12"
      >
        <Stack spacing="8" order={{ base: 2, md: 1 }}>
          <Stack spacing="3">
            <Flex alignItems="center" gap="2">
              <Heading size="lg">{missionName}</Heading>
              <Spacer />
              {(success || upcoming) && (
                <Badge variant="outline" fontSize="1em">
                  {upcoming ? 'Upcoming' : 'Successful'}
                </Badge>
              )}
            </Flex>
            <Text>
              <Text as="b">Date:</Text> {date}
            </Text>
            {details && <Text>{details}</Text>}
            <Text>
              <Text as="b">Rocket:</Text> {rocketName}
            </Text>
          </Stack>

          {!!crewDetails.length && <CrewDetails crew={crewDetails} />}
          {!!payloadsDetails && <PayloadsDetails payloads={payloadsDetails} />}
        </Stack>

        <Flex
          order={{ base: 1, md: 2 }}
          justifyContent="center"
          alignItems="start"
        >
          <Image
            src={patchUrl}
            alt={`${missionName} patch`}
            fallbackSrc={FallbackPatch}
            borderRadius="lg"
            bg="#E2E8F0"
            objectFit="contain"
            p="4"
          />
        </Flex>
      </SimpleGrid>
    </Layout>
  );
};

export default DetailPage;
