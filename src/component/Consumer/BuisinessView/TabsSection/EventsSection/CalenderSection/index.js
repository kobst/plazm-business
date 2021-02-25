import React,{useState} from "react";
import styled from "styled-components"
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import SaveButton from '../../../../UI/SaveButton'

const CalenderSectionWrap = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px;
    flex-direction: column;
    background: #221e45;
    @media (max-width:767px){ 
    }
`
const TopArrows = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    @media (max-width:767px){ 
    }
`
const LeftArrow = styled.div`
    width:26px;
    height: 26px;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        font-size: 34px;
        color: #fff;
    }
    @media (max-width:767px){ 
    }
    &.disabled{
        opacity: 0.4;        
    }
`
const RightArrow = styled.div`
    width:26px;
    height: 26px;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        font-size: 34px;
        color: #fff;
    }
    @media (max-width:767px){ 
    }
    &.disabled{
        opacity: 0.4;        
    }
`
const DaysWrap = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:center;
    justify-content: space-between;
    margin: 0 0 15px;
    @media (max-width:767px){ 
    }
`

const DaysDiv = styled.div`
    width:55px;
    height: 23px;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #2b2759;
    border-radius: 13px;
    font-size: 10px;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 0 10px;
    @media (max-width:767px){ 
    }
    &.current{
        background:#FF2E9A;
        box-shadow: 10px 0px 43px -12px #1C1838;
        backdrop-filter: blur(250px);
    }
    &.disabled{
        opacity: 0.4;        
    }
`
const BtnWrap = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    button {
        padding: 0;
        line-height: 14px;
        font-weight: 600;
        min-width: 110px;
    }
    @media (max-width:767px){ 
    }
`

const CalenderSection = ({}) => {
    return (
    <>
    <CalenderSectionWrap>
        <TopArrows>
            <LeftArrow className="disabled">
                <RiArrowDropLeftLine />
            </LeftArrow>
            <RightArrow>
                <RiArrowDropRightLine />
            </RightArrow>
        </TopArrows>
        <DaysWrap>
            <DaysDiv className="disabled">sun</DaysDiv>
            <DaysDiv className="disabled">mon</DaysDiv>
            <DaysDiv className="current">tue</DaysDiv>
            <DaysDiv>wed</DaysDiv>
            <DaysDiv>thur</DaysDiv>
            <DaysDiv>fri</DaysDiv>
            <DaysDiv>sat</DaysDiv>            
        </DaysWrap>
        <BtnWrap>
            <SaveButton>Create Event</SaveButton>
        </BtnWrap>
    </CalenderSectionWrap>
    </>
    )
}
  
  export default CalenderSection