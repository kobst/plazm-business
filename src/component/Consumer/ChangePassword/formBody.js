import React from 'react';
import styled from 'styled-components';
import Input from '../UI/FormikInput';

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
  font-weight: bold;
  font-size: 10px;
  text-transform: uppercase;
  color: #7f75bf;
  line-height: normal;
`;
// form body to change Password
function FormBody({ formError, setResponse }) {
  return (
    <>
      <InputContainer>
        <LabelText>Old Password</LabelText>
        <Input
          type="password"
          name="oldPassword"
          formError={formError}
          onFocus={() => setResponse('')}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>New Password</LabelText>
        <Input
          type="password"
          name="newPassword"
          onFocus={() => setResponse('')}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Re-Type New Password</LabelText>
        <Input
          type="password"
          name="confirmPassword"
          onFocus={() => setResponse('')}
        />
      </InputContainer>
    </>
  );
}
export default FormBody;
