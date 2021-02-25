import React,{useState} from "react";
import styled from "styled-components"
import BuisinessHeader from '../BuisinessHeader'
import BuisinessProfileSection from '../BuisinessProfileSection'
import BuisinessProfileDescription from '../BuisinessProfileDescription'

const BuisinessViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
`
const BottomContent = styled.div`
    padding: 35px;
    @media (max-width:767px){
        padding: 15px;
    }
`

const BuisinessProfileDetails = ({setDisplayTab}) => {
    return (
    <>
    <BuisinessViewContent>
        <BuisinessHeader />
        <BottomContent>
            <BuisinessProfileSection />
            <BuisinessProfileDescription />
        </BottomContent>
    </BuisinessViewContent>
    </>
    )
}
  
  export default BuisinessProfileDetails