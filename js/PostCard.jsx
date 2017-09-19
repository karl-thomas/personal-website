// @flow

import React from 'react';
import styled from 'styled-components';
import media from './utilities';

const Card = styled.div`
  display: inline-block;
  background-color: rgba(156, 196, 205, 1);
  position: relative;
  overflow-y: scroll;
  height: 100px;
  width: 27%;
  ${media.phone``};
`;
const PostCard = (props: Object) => (
  <Card>
    {props.id}
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  </Card>
);

export default PostCard;
