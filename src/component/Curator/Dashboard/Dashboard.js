import React,{useState} from "react";
import styled from "styled-components"
import LeftBar from "../../UI/Curator/LeftBar"
import RightBar from "../Dashboard/RightBar"

const DashboardContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
`

const Dashboard = () => {
    const [displayTab, setDisplayTab] = useState(false)
    return (
    <>
    <DashboardContent>
        <LeftBar displayTab={displayTab} setDisplayTab={setDisplayTab}/>
        <RightBar displayTab={displayTab}/>
    </DashboardContent>
    </>
    )
}
  
  export default Dashboard