import React from "react";
import styled from "styled-components";

const LabelText = styled.label`
  margin: 0px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #181818;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const Label = (props) => {
  return <LabelText>{props.name}</LabelText>;
};

export default Label;
