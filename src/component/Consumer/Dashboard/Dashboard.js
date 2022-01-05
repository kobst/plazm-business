import React, { useState, useEffect} from "react";
import styled from "styled-components";
import LeftBar from "../../UI/Consumer/LeftBar";
import SideBar from "../../UI/Consumer/SideBar/SideBar";
import SideBarTabs from "../../UI/Consumer/SideBarTabs/SideBarTabs";
import Header from "../../UI/Consumer/Header/Header"
import RightBar from "../Dashboard/RightBar";
import GridContainer from "../GridComponents/index"
import MapView from "../mapView/index"
import RadarView from "../radarView/radarView"

const DashboardContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const Dashboard = ({
  profile,
  setFlag,
  isBusinessOpen,
  businessExists,
  businessId,
  isUserOpen,
  userId,
}) => {
  const [displayTab, setDisplayTab] = useState(false);
  const [gridMode, setGridMode] = useState(false)


  useEffect(() => {
    if (gridMode) {
      console.log("show grid")}
  }, [gridMode])

  return (
    <>
        <DashboardContent>
            <SideBarTabs
            isUserOpen={isUserOpen}
            displayTab={displayTab}
            setDisplayTab={setDisplayTab}
            profile={profile}
            setFlag={setFlag}
            isBusinessOpen={isBusinessOpen}
            businessExists={businessExists}
            businessId={businessId}
            userId={userId}
          /> 

        {/*  break out panel content*/}

          <GridContainer gridMode={gridMode}/>
          <MapView/>
          <RadarView/>

          <Header gridMode={gridMode} setGridMode={setGridMode}/>

          {/* <RightBar displayTab={displayTab} /> */}
        </DashboardContent>
    </>
  );
};

export default Dashboard;




          {/* <LeftBar
            isUserOpen={isUserOpen}
            displayTab={displayTab}
            setDisplayTab={setDisplayTab}
            profile={profile}
            setFlag={setFlag}
            isBusinessOpen={isBusinessOpen}
            businessExists={businessExists}
            businessId={businessId}
            userId={userId}
          /> */}
