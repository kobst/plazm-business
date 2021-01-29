import React from "react";
import styled from "styled-components"
import LeftBar from "../../UI/Curator/LeftBar"
import RightBar from "../Dashboard/RightBar"

const DashboardContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
`

const Dashboard = () => (
    <>
    <DashboardContent>
        <LeftBar />
        <RightBar />
    </DashboardContent>
    </>
  )
  
  export default Dashboard