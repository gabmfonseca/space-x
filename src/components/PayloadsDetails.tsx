import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Payloads } from '../api/types';

interface PayloadsProps {
  payloads: Payloads[];
}

function PayloadsDetails({ payloads }: PayloadsProps) {
  return (
    <Stack gap="3">
      <Heading size="md">Payloads Information</Heading>
      <Accordion allowMultiple>
        {payloads.map(
          (
            { name, type, manufacturers, nationalities, orbit, mass_kg, id },
            index,
            arr
          ) => (
            <AccordionItem key={id}>
              <h2>
                <AccordionButton>
                  <Box as="b" flex="1" textAlign="left">
                    {name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {type && <Text>Type: {type}</Text>}
                {!!manufacturers?.length && (
                  <Text>Manufacturers: {manufacturers.join(', ')}</Text>
                )}
                {!!nationalities?.length && (
                  <Text>Nationalities: {nationalities.join(', ')}</Text>
                )}
                {orbit && <Text>Orbit: {orbit}</Text>}
                {mass_kg && <Text>Mass: {mass_kg}kg</Text>}
                {index !== arr.length - 1 && <Divider mt="2" />}
              </AccordionPanel>
            </AccordionItem>
          )
        )}
      </Accordion>
    </Stack>
  );
}

export default PayloadsDetails;
