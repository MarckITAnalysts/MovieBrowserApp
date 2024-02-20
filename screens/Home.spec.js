import React from 'react';
import renderer, {act} from 'react-test-renderer';
import HomeScreen from './HomeScreen';

jest.useFakeTimers()

jest.mock('react-native-snap-carousel', () => 'Carousel');
jest.mock('expo-status-bar', () => ({
  ...jest.requireActual('expo-status-bar'),
  StatusBar: () => {},
}));
jest.mock('react-native-progress', () => ({
  ...jest.requireActual('react-native-progress'),
  Progress: () => {},
}));

const mockedUsedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockedUsedNavigate,
}));

jest.mock('React', () => ({
  ...jest.requireActual('React'),
  useEffect: jest.fn(),
}));


describe('Home screen test cases', () => {
  beforeEach(() => {
    React.useState = jest
      .fn()
      .mockReturnValueOnce([[], {}])
      .mockReturnValueOnce([[], {}])
      .mockReturnValueOnce([[], {}])
      .mockReturnValueOnce([[], {}]);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
