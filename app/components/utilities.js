import { css } from 'styled-components'; // this has to be in brackets, apparently it has two css vars

// color helpers
export const colors = {
  torq: 'rgba(29, 225, 162, 0.75)',
  lightCyan: 'rgba(222, 255, 242, 1)',
  purp: 'rgba(70, 34, 85, 0.75)',
  space: 'rgba(70, 79, 81, 1)',
  black: 'rgba( 0, 0, 9, 1)',
  torqPurp: 'rgb(54, 191, 154)',
  lightTorq: 'hsla(161, 34%, 93%, 0.75)',
  lightPurp: 'hsla(282, 49%, 96%, 0.75)',
  github: '#FF934F',
  spotify: '#50e5b7',
  twitter: '#4682b4',
  Twitter: '#4682b4',
  closed_pull_request: '#FF934F',
  commits: '#50e5b7',
  opened_pull_request: '#46536e',
  unique_views: '#7785AC',
  clones: '#CC5A71',
  Github: '#FF934F',
  Spotify: '#50e5b7'
};

export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 750
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`@media (max-width: ${sizes[label] / 16}em) {${css(...args)};}`;
  return acc;
}, {});

export default media;
