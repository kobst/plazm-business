
import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
font-size: 22px;
line-height: 36px;
color: #FF4F94;
font-weight:normal;
`;

const SubHeading = (props) => {
  return (
    <Title>{props.name}</Title>
  );
};

export default SubHeading;
