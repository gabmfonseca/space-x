import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Launch } from '../api/types';
import FallbackPatch from '../fallbackPatch.png';

const LaunchCard = ({
  id,
  missionName,
  patch,
  date,
  details,
  rocketName,
}: Launch) => {
  return (
    <Card key={id} data-testid="launch-card">
      <CardBody>
        <Flex justifyContent="center">
          <Image
            src={patch}
            alt={`${missionName} patch`}
            fallbackSrc={FallbackPatch}
            borderRadius="lg"
            bg="#E2E8F0"
            objectFit="contain"
            p="2"
          />
        </Flex>
        <Stack mt="6" spacing="2">
          <Text fontSize="sm">{date}</Text>
          <Heading size="md" textTransform="uppercase">
            {missionName}
          </Heading>
          <Text fontSize="md" noOfLines={5}>
            {details || 'No details available.'}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter width="full">
        <Link to={`launch/${id}`} style={{ width: '100%' }}>
          <Button width="full">View more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LaunchCard;
