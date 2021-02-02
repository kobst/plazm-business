import React from "react";
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import Input from '../UI/Input/Input'
import SaveButton from '../UI/SaveButton'
import BackButton from '../UI/BackButton'
import { FaSort } from "react-icons/fa";
import Checkbox from '../UI/Checkbox';
import { HiPlus } from "react-icons/hi";

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
    display:flex;
    align-items:center;
    justify-content:space-between;
    @media (max-width:767px){
        font-size: 16px;
        padding: 0 0 13px 20px;
    }
    svg{
        font-size: 12px;
        margin: 0 23px 0 0;
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
    min-height: 60px;
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
const CheckboxContainer = styled.div`
    width: 100%;
    padding: 0 0 0 5px;
    margin: 10px 0 15px;
    display:flex;
    flex-direction:row;
    align-items:center;
    font-weight: 600;
    font-size: 13px;
    color:#fff;
`
const UploadImageContainer = styled.div`
    width: 100%;
    padding: 0 40px;
    margin: 40px 0 0px;
    display:flex;
    flex-direction:row;
    align-items:center;
    font-weight: 600;
    font-size: 13px;
    color:#fff;
    @media (max-width:767px){
        flex-direction:column;
        padding: 0 20px;
        margin: 20px 0 0px;
    }
`

const UploadImage = styled.div`
    width: 125px;
    height: 125px;
    padding: 0;
    margin: 0 15px 0 0;
    display:flex;
    align-items:center;
    background: #FAFAFA;
    border: 2px solid #F5F5F5;
    box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1);
    border-radius:50%;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    svg{
        color: #C5C5C5;
        font-size: 32px;
    }
    img{
        max-width:100%;
    }
    @media (max-width:767px){
        width: 60px;
        height: 60px;
        margin: 0 0 15px 0;
    }
`
const UploadImageText = styled.div`
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #FFFFFF;
    max-width: calc(100% - 145px);
    width: 100%;
    @media (max-width:767px){
        max-width: 100%;
        line-height: normal;
    }
`
/*
@desc: profile settings
@params: setDisplayChangePassword (to display change password or profile settings)
*/
const ProfileSettings = ({setDisplayChangePassword, setDisplayTab}) => {
    return (
    <>
        <ChangePasswordContent>
            <CloseDiv><IoMdClose onClick={()=>setDisplayTab(false)}/></CloseDiv>
            <MainHeading>Profile Settings <FaSort /></MainHeading>
            <UploadImageContainer>
                <UploadImage>
                    <HiPlus />
                </UploadImage>
                <UploadImageText>Any message regarding profile picture uploading dimensions and file sizes goes here</UploadImageText>
            </UploadImageContainer>
            
            <FormContainer>
                <InputContainer>
                    <LabelText>First Name</LabelText>
                    <Input />
                </InputContainer>
                <InputContainer>
                    <LabelText>Last Name</LabelText>
                    <Input />
                </InputContainer>
                <InputContainer>
                    <LabelText>User Name</LabelText>
                    <Input />
                </InputContainer>
                <InputContainer>
                    <LabelText>Email Address</LabelText>
                    <Input />
                </InputContainer>
                <CheckboxContainer>
                    <Checkbox /> <span>Lock My Profile</span>
                </CheckboxContainer>
                <BottomBtns>
                    <BackButton onClick={()=>setDisplayChangePassword(true)}>Change Password</BackButton>
                    <SaveButton>Save</SaveButton>
                </BottomBtns>                
            </FormContainer>
        </ChangePasswordContent>
    </>
    )
    }
  
export default ProfileSettings