import styled from 'styled-components';
import media from '../utilities';

const Wrap = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 25px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${media.phone`
    & > svg > g {
      transform: translate(20px,20px)
    }
    `};
`;

export default Wrap;
