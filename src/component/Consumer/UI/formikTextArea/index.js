import React from 'react';
import {useField} from 'formik';
import styled from 'styled-components';
import error from '../../../../constants';

const InputText = styled.textarea`
  min-height: 100px;
  border: 0;
  height: 60px;
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
/*
@desc: formik form input box
*/
const TextArea = ({label, formError, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <center>
        <InputText {...field} {...props} className="text-input" />
      </center>
      {meta.error || formError === error.INCORRECT_OLD_PASSWORD ? (
        <ErrorDiv>{meta.error || formError}</ErrorDiv>
      ) : null}
    </>
  );
};

export default TextArea;
