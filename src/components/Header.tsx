import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ReactComponent as SpaceXLogo } from '../spacex-logo.svg';

const HEADER_SIZE = '60px';

const Header = () => {
  return (
    <Box
      as="header"
      bg="gray.800"
      position="fixed"
      w="full"
      h={HEADER_SIZE}
      zIndex="2"
    >
      <Flex w="full" h="full" alignItems="center" px="10">
        <Box w="100px" mr={2} color="white">
          <Link to="/">
            <SpaceXLogo />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
