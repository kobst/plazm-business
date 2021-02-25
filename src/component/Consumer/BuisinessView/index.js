import React,{useState} from "react";
import styled from "styled-components"
import BuisinessHeader from './BuisinessHeader'
import TabsSection from './TabsSection'
import BuisinessHeaderNotClaimed from './BuisinessHeaderNotClaimed'
import BuisinessProfileDetails from './BuisinessProfileDetails'

const BuisinessViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
    flex-direction: column;
`

const BuisinessView = ({setDisplayTab}) => {
    return (
    <>
    <BuisinessViewContent>
        <BuisinessHeader setDisplayTab={setDisplayTab} />
        {/* <BuisinessHeaderNotClaimed setDisplayTab={setDisplayTab} */}
        <TabsSection />
        {/* <BuisinessProfileDetails /> */}
    </BuisinessViewContent>
    </>
    )
}
  
  export default BuisinessView