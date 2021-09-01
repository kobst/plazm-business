import React, { useState } from "react";
import styled from "styled-components";
import ValueLoader from "../../../utils/loader";
import LeftBar from "../../UI/Consumer/LeftBar";
import RightBar from "../Dashboard/RightBar";

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
  const [loader, setLoader] = useState(false);
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
          loader={loader}
          setLoader={setLoader}
        />
        {!loader ? (
          <RightBar displayTab={displayTab} />
        ) : (
          <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
            <ValueLoader height="100" width="100" />
          </div>
        )}
      </DashboardContent>
    </>
  );
};

export default Dashboard;
