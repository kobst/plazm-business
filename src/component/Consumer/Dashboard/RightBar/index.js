import React from "react";
import styled from "styled-components"
import RightBG from '../../../../images/Gridview.png';

const RightBarContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    max-width: calc(100% - 100px);
    transition: 0.5s;
    left: 0;
    img{
        width:100%;
        height:100%;
    }
    @media (max-width:767px){
        max-width: calc(100% - 50px);
    }
    &.imgSlide_onTabOpen{
    left: 440px;
    max-width: calc(100% - 540px);
    transition: 0.5s;
        @media (max-width:767px){
            left: 0px;
            max-width: 100%;
        }
    }
`

const RightBar = ({displayTab}) => (
    <>
        <RightBarContent className={displayTab===true?"imgSlide_onTabOpen":""}>
        </RightBarContent>
    </>
  )
  
export default RightBar