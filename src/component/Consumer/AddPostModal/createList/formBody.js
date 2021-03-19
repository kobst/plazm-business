import React from "react";
import styled from "styled-components";
import Input from "../../UI/FormikInput";
import TextArea from "../../UI/formikTextArea";

const InputContainer = styled.div`
  border: 1px solid ${(props) => (props.usererror ? "#FF7171" : "#ffffff")};
  min-height: 60px;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
  padding: 6px 8px;
  margin: 0 0 20px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 0px;
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.label`
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  color: #7f75bf;
  line-height: normal;
`;

/*
 *@desc: form body for update profile
 */
function FormBody({ loader, setResponse }) {
  return (
    <>
      <InputContainer>
        <LabelText>Add Title</LabelText>
        <Input
          type="text"
          name="title"
          disabled={loader}
          onFocus={() => setResponse("")}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Add Description</LabelText>
        <TextArea
          type="text"
          name="description"
          disabled={loader}
          onFocus={() => setResponse("")}
        />
      </InputContainer>
    </>
  );
}
export default FormBody;
