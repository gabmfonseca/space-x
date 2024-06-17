import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CrewMember } from '../api/types';

interface CrewDetailsProps {
  crew: CrewMember[];
}

const CrewDetails = ({ crew }: CrewDetailsProps) => {
  return (
    <Stack spacing="3">
      <Heading size="md">Crew Information</Heading>
      <Stack>
        {crew.map(({ name, agency, image, wikipedia, status, id }) => (
          <Card key={id}>
            <CardBody>
              <Flex gap="4" alignItems="center" flexWrap="wrap">
                <Avatar src={image || undefined} />
                <Box>
                  {name && (
                    <Heading size="sm">
                      {name}
                      {status !== 'unknown' && <Badge ml="2">{status}</Badge>}
                    </Heading>
                  )}
                  {agency && <Text>{agency}</Text>}
                  {wikipedia && (
                    <Link href={wikipedia} isExternal fontSize="sm">
                      Open Wikipedia <ExternalLinkIcon mb="0.5" />
                    </Link>
                  )}
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default CrewDetails;
