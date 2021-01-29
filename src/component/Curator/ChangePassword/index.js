import React from "react";
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import Input from '../UI/Input/Input'
import SaveButton from '../UI/SaveButton'
import BackButton from '../UI/BackButton'

const ChangePasswordContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;
`

const MainHeading = styled.h1`
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    margin:48px 0 0;
    padding: 0 0 13px 23px;
    border-bottom: 0.5px dashed #FFFFFF;
    @media (max-width:767px){
        font-size: 16px;
        padding: 0 0 13px 20px;
    }
`
const CloseDiv = styled.div`
    width:24px;
    position: relative;
    display:flex;
    justify-content:flex-end;
    position: absolute;
    right: 17px;
    cursor: pointer;
    top: 17px;
    svg{
        font-size:24px;
        color:#fff;
    }
`

const FormContainer = styled.div`
    padding: 40px;
    display:flex;
    flex-direction:column;
    @media (max-width:767px){
        padding: 20px;
    }
`
const InputContainer = styled.div`
    border: 1px solid  ${props => props.usererror ? "#FF7171" : "#ffffff" };
    height: 60px;
    font-size: 16px;
    line-height:21px;
    width: 100%;
    padding:6px 8px;
    margin:0 0 15px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 0px;
    display:flex;
    flex-direction:column;
`

const LabelText = styled.label`
    font-weight: bold;
    font-size: 10px;
    text-transform: uppercase;
    color: #7F75BF;
    line-height: normal;
`

const BottomBtns = styled.div`
    display:flex;
    justify-content:space-between;
    margin: 10px 0 0;
`


const ChangePassword = () => (
    <>
        <ChangePasswordContent>
            <CloseDiv><IoMdClose /></CloseDiv>
            <MainHeading>Change Password</MainHeading>
            <FormContainer>
                <InputContainer>
                    <LabelText>Old Password</LabelText>
                    <Input />
                </InputContainer>
                <InputContainer>
                    <LabelText>New Password</LabelText>
                    <Input />
                </InputContainer>
                <InputContainer>
                    <LabelText>Re-Type New Password</LabelText>
                    <Input />
                </InputContainer>
                <BottomBtns>
                    <BackButton>Back</BackButton>
                    <SaveButton>Save</SaveButton>
                </BottomBtns>                
            </FormContainer>
        </ChangePasswordContent>
    </>
  )
  
export default ChangePassword