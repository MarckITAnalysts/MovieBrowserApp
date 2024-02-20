import React from 'react';
import renderer from 'react-test-renderer';
import MovieDetailScreen from './MovieDetailScreen';

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
  useRoute: () => ({params: {item: {id: 1}}})
}));

jest.mock('React', () => ({
  ...jest.requireActual('React'),
  useEffect: jest.fn()
}));


describe('Movie Detail Screen test cases', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MovieDetailScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
