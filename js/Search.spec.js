import React from 'react'
import Search from './Search'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ShowCard from './ShowCard'
import preload from '../public/data.json'

test('Search snapshot test', () => {
	const component = shallow(<Search />)
	const tree = shallowToJson(component)
	expect(tree).toMatchSnapshot()
})

test ('Search should render a showcard for each show before search', () => {
	const component = shallow(<Search />)
	expect(component.find(ShowCard).length).toEqual(preload.shows.length)
})
