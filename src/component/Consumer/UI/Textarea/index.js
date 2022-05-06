import React from 'react';
import styled from 'styled-components';

const InputText = styled.textarea`
  border: 0;
  height: 60px;
  font-size: 16px;
  line-height: normal;
  width: 100%;
  padding: 10px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 2px;
  color: #222;
  font-weight: 400;
  resize: none;
  font-size: 12px;
  font-family: Montserrat;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #c6c6c6;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

function Textarea(props) {
  return <InputText ref={props.refs} {...props} />;
}

export default Textarea;
