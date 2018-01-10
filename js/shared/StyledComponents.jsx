import styled from 'styled-components';
import media, { colors } from '../utilities';

export const PostWrapper = styled.div`
  z-index: -1000;
  position: fixed;
  padding: 4em 3em;
  height: 75vh;
  width: calc(97% - 250px);
  overflow-y: scroll;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props =>
    props.startPos
      ? 'transform: translate(calc(250px + 4%),calc(112px + 5vh));'
      : 'transform: translate(100vw,100vh);'};
  ${media.phone`
    visibility: visible;
      transform: translate(0px);
      top: 112px;
      left:0px;
      width:100%;
    `};
`;

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

export const Li = styled.li`
  height: 50px;
  margin-bottom: 10px;
  padding-left: 10px;
  -webkit-transition: all 0.7s ease-out;
`;
export const Pan = styled.div`
  box-shadow: inset 2px 3px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: inline-block;
  background-color: ${props => (props.startPos ? colors.torqPurp : '#46536e')};
  z-index: -1000;
  width: 3px;
  height: 40px;
  -webkit-transition: all 0.4s ease-out;
  ${Li}:hover & {
    width: calc(90% - 1.5em);
  }
`;

export const LinkText = styled.h1`
  padding-left: 10px;
  font-weight: 500;
  color: white;
  position: absolute;
  z-index: 1000;
  margin: auto;
  ${Li}:hover & {
    width: calc(100% - 1em);
    &::after {
      content: '  ►';
      color: ${props => (props.startPos ? '#50e5b7' : '#6f567d')};
      text-shadow: 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default Wrap;
