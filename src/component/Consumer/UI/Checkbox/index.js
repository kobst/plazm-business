import React from 'react';
import styled from 'styled-components';
import './checkbox-style.css';
import { Field } from 'formik';

const DivText = styled.label`
  border: 0;
  height: 15px;
  font-size: 16px;
  line-height: normal;
  width: 15px;
  padding: 0;
  margin: 0 5px 0 0;
  :focus {
    outline: none;
  }
`;

function Checkbox({ loader }) {
  return (
    <DivText className="container">
      <Field type="checkbox" name="lockMyProfile" disabled={loader} />
      <span className="checkmark" />
    </DivText>
  );
}

export default Checkbox;
