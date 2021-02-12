import React,{useState} from "react";
import styled from "styled-components"
import LeftBar from "../../UI/Consumer/LeftBar"
import RightBar from "../Dashboard/RightBar"

const DashboardContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    height: 100%;
`

const Dashboard = ({profile,setFlag}) => {
    const [displayTab, setDisplayTab] = useState(false)
    return (
    <>
    <DashboardContent>
        <LeftBar displayTab={displayTab} setDisplayTab={setDisplayTab} profile={profile} setFlag={setFlag}/>
        <RightBar displayTab={displayTab}/>
    </DashboardContent>
    </>
    )
}
  
  export default Dashboard