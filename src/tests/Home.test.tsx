import { ChakraProvider, theme } from '@chakra-ui/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Home from '../routes/Home';

const MOCK_DATA = {
  launches: [
    {
      id: '1',
      missionName: 'Mock Mission 1',
      rocketName: 'Falcon 1',
      upcoming: true,
      success: false,
    },
    {
      id: '2',
      missionName: 'Mock Mission 2',
      rocketName: 'Falcon 9',
      upcoming: false,
      success: true,
    },
    {
      id: '3',
      missionName: 'Mock Mission 3',
      rocketName: 'Falcon 1',
      upcoming: false,
      success: true,
    },
    {
      id: '4',
      missionName: 'Mock Mission 4',
      rocketName: 'Falcon Heavy',
      upcoming: false,
      success: false,
    },
  ],
  rockets: ['Falcon 1', 'Falcon 9', 'Falcon Heavy'],
};

const routes = [
  {
    path: '/',
    element: <Home />,
    loader: () => MOCK_DATA,
  },
];
const router = createMemoryRouter(routes, {
  initialEntries: ['/'],
});

describe('SpaceX Launches', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    );
  });

  it('should render the home page components', async () => {
    const launchCards = await screen.findAllByTestId('launch-card');
    expect(launchCards).toHaveLength(4);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('filter-upcoming')).toBeInTheDocument();
    expect(screen.getByTestId('filter-success')).toBeInTheDocument();
  });

  it('should filter launches by rocket name', async () => {
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'heavy' },
    });
    const filteredItems = await screen.findAllByTestId('launch-card');
    expect(filteredItems).toHaveLength(1);
  });

  it('should filter launches by upcoming status', async () => {
    fireEvent.click(screen.getByTestId('filter-upcoming'));
    const filteredItems = await screen.findAllByTestId('launch-card');
    expect(filteredItems).toHaveLength(1);
  });

  it('should filter launches by success status', async () => {
    fireEvent.click(screen.getByTestId('filter-success'));
    const filteredItems = await screen.findAllByTestId('launch-card');
    expect(filteredItems).toHaveLength(2);
  });

  it('should clear the search input', async () => {
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'Falcon' },
    });

    const clearButton = screen.getByTestId('search-clear');
    fireEvent.click(clearButton);

    const allItems = await screen.findAllByTestId('launch-card');
    expect(allItems).toHaveLength(4);
  });
});
