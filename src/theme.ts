import { extendTheme } from '@chakra-ui/react';
import '@fontsource/barlow/300.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';

const theme = extendTheme({
  fonts: {
    heading: `'Barlow', sans-serif`,
    body: `'Barlow', sans-serif`,
  },
});

export default theme;
