// @flow

import React from 'react';
import { shallow } from 'enzyme';
import preload from '../../data.json';
import Search, { Unwrapped as UnwrappedSearch } from '../Search';
import ShowCard from '../ShowCard';

test('Search renders Correctly', () => {
  const component = shallow(<Search shows={preload.shows} />);
  expect(component).toMatchSnapshot();
});

test('Seach should render correct amount of shows', () => {
  const component = shallow(<Search shows={preload.shows} />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

// test('Search should render correct amount of shows based on search term', () => {
//   const searchWord = 'black';
//   const component =  shallow(<Search shows={preload.shows} />)
// });
