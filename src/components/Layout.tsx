import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import Transition from './Transition';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <Container maxW="5xl" overflowX="hidden" py="20">
        <Transition>{children}</Transition>
      </Container>
    </div>
  );
};

export default Layout;
