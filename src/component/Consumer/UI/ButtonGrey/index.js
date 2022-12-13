import React from 'react';
import styled from 'styled-components';

const ButtonText = styled.button`
  background: #878787;
  height: 34px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: bold;
  min-width: 100px;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : 'inherit')};
  border-radius: 5px;
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

const ButtonGrey = (props) => {
  return <ButtonText ref={props.refs} {...props} />;
};

export default ButtonGrey;
