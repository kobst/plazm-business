import React from 'react';
import styled from 'styled-components';

const LabelText = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #756f86;
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 19px;
  }
`;

function Label(props) {
  return <LabelText>{props.name}</LabelText>;
}

export default Label;
