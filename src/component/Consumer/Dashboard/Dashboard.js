import React, { useState } from "react";
import styled from "styled-components";
import LeftBar from "../../UI/Consumer/LeftBar";
import SideBar from "../../UI/Consumer/SideBar/SideBar";
import SideBarTabs from "../../UI/Consumer/SideBarTabs/SideBarTabs";
import Header from "../../UI/Consumer/Header/Header"
import RightBar from "../Dashboard/RightBar";
import GridContainer from "../GridComponents/index"

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
  return (
    <>
        <DashboardContent>
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

          <GridContainer/>

          <Header/>
          {/* <RightBar displayTab={displayTab} /> */}
        </DashboardContent>
    </>
  );
};

export default Dashboard;
