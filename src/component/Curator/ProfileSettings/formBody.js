import React from "react";
import styled from "styled-components";
import Checkbox from "../UI/Checkbox";
import Input from "../UI/FormikInput";

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
const CheckboxContainer = styled.div`
  width: 100%;
  padding: 0 0 0 5px;
  margin: 10px 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  color: #fff;
`;

/*
*@desc: form body for update profile
*/
function FormBody({loader}) {
  return (
    <>
      <InputContainer>
        <LabelText>Name</LabelText>
        <Input type="text" name="name" disabled={loader}/>
      </InputContainer>
      <InputContainer>
        <LabelText>Phone Number</LabelText>
        <Input type="text" name="phoneNumber" disabled={loader}/>
      </InputContainer>
      <InputContainer>
        <LabelText>Email Address</LabelText>
        <Input type="email" name="email" disabled={loader} />
      </InputContainer>
      <CheckboxContainer>
        <Checkbox /> <span>Lock My Profile</span>
      </CheckboxContainer>
    </>
  );
}
export default FormBody;
