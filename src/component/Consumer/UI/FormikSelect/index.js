import {useField} from 'formik';
import React from 'react';
import styled from 'styled-components';

const InputText = styled.select`
  border: 0;
  height: 36px;
  font-size: 16px;
  line-height: normal;
  width: 100%;
  padding: 10px;
  padding-left: 0px;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 2px;
  color: #222;
  font-weight: bold;
  resize: none;
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

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 11px;
  margin: 0;
`;

const FormikSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <InputText {...field} {...props} className="text-input" />
      {meta.touched && meta.error ? (
          <ErrorDiv>{meta.error}</ErrorDiv>
        ) : null}
    </>
  );
};
export default FormikSelect;
