import React from "react";
import styled from "styled-components";

const ButtonText = styled.button`
  background: #136EF1;
  border-radius: 2px;
  height: 25px;
  font-size: 9px;
  line-height: 11px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: 700;
  width: 90%;
  font-family: "Roboto", sans-serif;
  min-width: 100px;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "inherit")};
  border: 0;
  padding: 0 25px;
  :hover,
  :focus {
    opacity: 0.6;
    outline: none;
    transition: 0.3s;
  }
  @media (max-width: 767px) {
    padding: 0 10px;
  }
  @media (max-width: 359px) {
    font-size: 10px;
  }
`;

const ButtonBlue = (props) => {
  return <ButtonText ref={props.refs} {...props} />;
};

export default ButtonBlue;
