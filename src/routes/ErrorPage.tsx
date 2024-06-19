import { Button, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import FallbackPatch from '../fallbackPatch.png';

const ErrorPage = () => {
  return (
    <Layout>
      <Stack textAlign="center" alignItems="center">
        <Image src={FallbackPatch} maxW="300px" />
        <Stack spacing="4">
          <Heading size="4xl">404</Heading>
          <Text fontSize="xl">We can't find the page you're looking for.</Text>
          <Link to="/">
            <Button size="lg" variant="outline">
              Go back home
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default ErrorPage;
