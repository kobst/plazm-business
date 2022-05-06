import React from 'react';
import styled from 'styled-components';

const ButtonText = styled.button`
  background: #ff2e9a;
  height: 34px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: bold;
  min-width: 105px;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : 'inherit')};
  border-radius: 5px;
  border: 0;
  :hover,
  :focus {
    opacity: 0.6;
    outline: none;
    transition: 0.3s;
  }
  @media (max-width: 359px) {
    font-size: 10px;
    min-width: 70px;
    height: 28px;
    padding: 0 10px;
  }
  .disabled {
    opacity: 0.6;
    cursor: auto;
    pointer-events: none;
  }
  :disabled,
  [disabled] {
    opacity: 0.6;
    cursor: auto;
    pointer-events: none;
  }
`;

function SaveButton(props) {
  return <ButtonText ref={props.refs} {...props} />;
}

export default SaveButton;
