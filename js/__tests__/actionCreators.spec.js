// @flow

import { setSearchTerm, addApiData } from '../actionCreators';

test('setSearchTerm', () => {
  expect(setSearchTerm('New York')).toMatchSnapshot();
});

test('addApiData', () => {
  expect(
    addApiData({
      title: 'Atlanta',
      year: '2008–2013',
      description:
        'Two cousins, with different views on art versus commerce, on their way up through the Atlanta rap scene; "Earnest \'Earn\' Marks," an ambitious college drop-out and his estranged cousin, who suddenly becomes a star.',
      poster: 'a.jpg',
      imdbID: 'tt4288182',
      trailer: 'MpEdJ-mmTlY',
      rating: '8.6'
    })
  ).toMatchSnapshot();
});
