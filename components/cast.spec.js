import React from 'react';
import renderer from 'react-test-renderer';
import Cast from './cast';


const mockedUsedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockedUsedNavigate,
}));

describe('cast test cases', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Cast cast={null} navigation={mockedUsedNavigate} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
