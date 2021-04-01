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

  &::after {
    content: "*";
  }
`;

/*
 *@desc: form body for create event
 */
function FormBody({
  loader,
  setResponse,
  setEventDescription,
  setEventTitle,
  formik,
}) {
  /**set form input value */
  const setValue = (e, field) => {
    if (field === "title") setEventTitle(e.target.value);
    else setEventDescription(e.target.value);
    formik.setFieldValue(field, e.target.value);
  };
  return (
    <>
      <InputContainer>
        <LabelText>Add Title</LabelText>
        <Input
          type="text"
          name="title"
          disabled={loader}
          onChange={(e) => setValue(e, "title")}
          onFocus={() => setResponse("")}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Add Description</LabelText>
        <TextArea
          type="text"
          name="description"
          disabled={loader}
          onChange={(e) => setValue(e, "description")}
          onFocus={() => setResponse("")}
        />
      </InputContainer>
    </>
  );
}
export default FormBody;
