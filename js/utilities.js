import { css } from 'styled-components'; // this has to be in brackets, apparently it has two css vars

// color helpers
export const colors = {
  lightBlue: 'rgba(146, 220, 229, 0.75)',
  blueShadow: 'rgba(146, 220, 229, 1)',
  puce: 'rgba(170, 91, 97, 0.75)'
};

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 550
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`@media (max-width: ${sizes[label] / 16}em) {${css(...args)};}`;
  return acc;
}, {});

export default media;

