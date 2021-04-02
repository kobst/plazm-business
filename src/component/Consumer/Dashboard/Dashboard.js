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

const Dashboard = ({profile,setFlag,isBusinessOpen,businessExists,businessId}) => {
    const [displayTab, setDisplayTab] = useState(false)
    return (
    <>
    <DashboardContent>
        <LeftBar displayTab={displayTab} setDisplayTab={setDisplayTab} profile={profile} setFlag={setFlag} isBusinessOpen={isBusinessOpen} businessExists={businessExists} businessId={businessId}/>
        <RightBar displayTab={displayTab}/>
    </DashboardContent>
    </>
    )
}
  
  export default Dashboard