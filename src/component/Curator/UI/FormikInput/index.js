import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const InputText = styled.input`
  border: 0;
  height: 36px;
  font-size: 16px;
  line-height: normal;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 0px;
  color: #222;
  font-weight: bold;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7c9cbf;
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
const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <center>
        <InputText {...field} {...props} className="text-input" />
      </center>
      {meta.error ? <ErrorDiv>{meta.error}</ErrorDiv> : null}
    </>
  );
};

export default Input;
