import React from 'react';
import renderer from 'react-test-renderer';
import TrendingMovies from './trendingMovies';

jest.mock('react-native-snap-carousel', () => 'Carousel');

const mockedUsedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockedUsedNavigate,
}));

const data = [
  {
    "adult": false,
    "backdrop_path": "/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg",
    "genre_ids": [
      878,
      28,
      18
    ],
    "id": 933131,
    "original_language": "ko",
    "original_title": "황야",
    "overview": "After a deadly earthquake turns Seoul into a lawless badland, a fearless huntsman springs into action to rescue a teenager abducted by a mad doctor.",
    "popularity": 2140.707,
    "poster_path": "/zVMyvNowgbsBAL6O6esWfRpAcOb.jpg",
    "release_date": "2024-01-26",
    "title": "Badland Hunters",
    "video": false,
    "vote_average": 6.742,
    "vote_count": 433
  },
]

describe('Home screen test cases', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TrendingMovies data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
