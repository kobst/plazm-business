import React from 'react';
import styled from 'styled-components';
import Input from '../../UI/FormikInput';
import TextArea from '../../UI/formikTextArea';

const InputContainer = styled.div`
  border: 1px solid ${(props) => (props.usererror ? '#FF7171' : '#ffffff')};
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
  font-weight: 500;
  font-size: 11px;
  text-transform: capitalize;
  color: #7f75bf;
  line-height: normal;
  font-family: Roboto;
`;

/*
 *@desc: form body for update profile
 */
function FormBody({loader, setResponse}) {
  return (
    <>
      <InputContainer>
        <LabelText>Add Title</LabelText>
        <Input
          type="text"
          name="title"
          disabled={loader}
          onFocus={() => setResponse('')}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Add Description</LabelText>
        <TextArea
          type="text"
          name="description"
          disabled={loader}
          onFocus={() => setResponse("")}
          className="CreateListDescription"
        />
      </InputContainer>
    </>
  );
}
export default FormBody;
