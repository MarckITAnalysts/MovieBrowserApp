import React from 'react';
import renderer from 'react-test-renderer';
import SearchScreen from './SearchScreen';

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


describe('Search Screen test cases', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
