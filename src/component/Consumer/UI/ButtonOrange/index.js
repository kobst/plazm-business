import React from "react";
import styled from "styled-components";

const ButtonText = styled.button`
  background: #ff6067;
  border-radius: 2px;
  height: 22px;
  font-size: 9px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: bold;
  min-width: 80px;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "inherit")};
  border: 0;
  :hover {
    opacity: 0.6;
    outline: none;
    transition: 0.3s;
  }
  @media (max-width: 359px) {
    font-size: 10px;
    min-width: 70px;
    height: 28px;
  }
`;

const ButtonOrange = (props) => {
  return <ButtonText ref={props.refs} {...props} />;
};

export default ButtonOrange;
