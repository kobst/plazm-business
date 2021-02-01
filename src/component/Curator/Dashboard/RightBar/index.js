import React from "react";
import styled from "styled-components"
import RightBG from '../../../../images/Gridview.png';

const RightBarContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    max-width: calc(100% - 100px);
    img{
        width:100%;
        height:100%;
    }
    @media (max-width:767px){
        max-width: calc(100% - 50px);
    }
`

const RightBar = ({displayTab}) => (
    <>
        <RightBarContent>
            <img src={RightBG} alt="rightImg" className={displayTab===true?"imgSlide_onTabOpen":""}/>
        </RightBarContent>
    </>
  )
  
export default RightBar