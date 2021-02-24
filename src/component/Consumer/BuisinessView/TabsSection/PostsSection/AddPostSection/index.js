import React,{useState} from "react";
import styled from "styled-components"
import Textarea from '../../../../UI/Textarea'
import Select from '../../../../UI/Select'
import SaveButton from '../../../../UI/SaveButton'
import AddImageImg from '../../../../../../images/addImage.svg'

const AddPostSectionContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px;
    background: #292454;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width:767px){ 
        flex-direction: column;
    }
`
const TextAreaWrap = styled.div`
    width:100%;
    max-width: calc(100% - 147px);
    @media (max-width:767px){ 
        max-width: 100%;
    }
`
const RightWrap = styled.div`
    width: 142px;
    display: flex;
    flex-direction: column;
    select {
        margin-bottom:5px;
        padding: 0 24px 0 10px;
    }
    @media (max-width:767px){ 
        width: 100%;
    }
`
const RightBottomWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width:767px){ 
        justify-content: flex-start;
    }
    button {
        font-weight: 600;
        min-width: 107px;
        height: 30px;
        @media (max-width:767px){ 
            margin-left: 5px;
        }
    }
`

const AddImageDiv = styled.div`
  background: #FF2E9A;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  svg {
    font-size: 34px;
    color: #fff;
  }
`

const AddPostSection = ({}) => {
    return (
    <>
    <AddPostSectionContent>
        <TextAreaWrap>
            <Textarea placeholder="What’s Happening ?" />
        </TextAreaWrap>
        <RightWrap>
            <Select>
                <option>Posting Options</option>
                <option>Posting Options Options</option>
            </Select>
            <RightBottomWrap>
                <AddImageDiv>
                    <img src={AddImageImg} alt="" />
                </AddImageDiv>
                <SaveButton>Post</SaveButton>
            </RightBottomWrap>
        </RightWrap>
    </AddPostSectionContent>
    </>
    )
}
  
  export default AddPostSection