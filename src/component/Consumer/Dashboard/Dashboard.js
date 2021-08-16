import React, { useState } from "react";
import styled from "styled-components";
import LeftBar from "../../UI/Consumer/LeftBar";
import RightBar from "../Dashboard/RightBar";
import GridThreeJS from "../GridMap/grid-three";


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
        <LeftBar
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
        {/* <RightBar displayTab={displayTab} /> */}
        <GridThreeJS/>
      </DashboardContent>
    </>
  );
};

export default Dashboard;
