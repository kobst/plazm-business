import React from "react";
import styled from "styled-components";

const LabelText = styled.label`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #181818;
  margin: 0px;
  &.RememberMeLabel {
    font-weight: 300;
    color: #756f86;
  }
`;

const Label = (props) => {
  return <LabelText>{props.name}</LabelText>;
};

export default Label;
