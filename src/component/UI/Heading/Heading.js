import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 24px;
  color: #000;
  font-weight: 500;
`;

function Heading(props) {
  return <Title {...props}>{props.name}</Title>;
}

export default Heading;
