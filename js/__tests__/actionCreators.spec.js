// @flow

import moxios from 'moxios';
import { setSearchTerm, addApiData, getApiDetails } from '../actionCreators';

test('setSearchTerm', () => {
  expect(setSearchTerm('New York')).toMatchSnapshot();
});

const atlanta = {
  title: 'Atlanta',
  year: '2008–2013',
  description:
    'Two cousins, with different views on art versus commerce, on their way up through the Atlanta rap scene; "Earnest \'Earn\' Marks," an ambitious college drop-out and his estranged cousin, who suddenly becomes a star.',
  poster: 'a.jpg',
  imdbID: 'tt4288182',
  trailer: 'MpEdJ-mmTlY',
  rating: '8.6'
};

test('addApiData', () => {
  expect(addApiData(atlanta)).toMatchSnapshot();
});

test('getApiDetails', (done: Function) => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    // calling the thunk that getApiDeets returns with our fake dispatch
    getApiDetails(atlanta.imdbID)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: atlanta
        })
        .then(() => {
          expect(request.url).toEqual(`http://localhost:3000/${atlanta.imdbID}`);
          expect(dispatchMock).toBeCalledWith(addApiData(atlanta));
          done(); // tell the test we are done
        });
    });
  });
});
