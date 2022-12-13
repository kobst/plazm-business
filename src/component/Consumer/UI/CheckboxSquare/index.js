import React from 'react';
import styled from 'styled-components';
import './checkboxSquare-style.css';

const DivText = styled.label`
  border: 0;
  height: 20px;
  font-size: 16px;
  line-height: normal;
  width: 20px;
  padding: 0;
  margin: 0 5px 0 0;
  :focus {
    outline: none;
  }
`;

const CheckboxSquare = () => (
  <>
    <DivText className="checkbox-button">
      <input
        type="checkbox"
        className="checkbox-button__input"
        id="choice1-1"
        name="choice1"
      />
      <span className="checkbox-button__control"></span>
    </DivText>
  </>
);

export default CheckboxSquare;
