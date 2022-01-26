import React, { useState, useEffect} from "react";
import styled from "styled-components";
import LeftBar from "../../UI/Consumer/LeftBar";
import SideBarTabs from "../../UI/Consumer/SideBarTabs/SideBarTabs";
import PanelContent from "../../UI/Consumer/Panel-Content/PanelContent";

import Header from "../../UI/Consumer/Header/Header"
import RightBar from "../Dashboard/RightBar";
import GridContainer from "../GridComponents/index"
import MapView from "../mapView/index"
import RadarView from "../radarView/radarView"

import useStore from "../useState";


const DashboardContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const Dashboard = ({view}) => {



  const gridMode = useStore((state) => state.gridMode)

  useEffect(() => {
    if (gridMode) {
      console.log("show grid")}
  }, [gridMode])


  // put all the grid logic here?  for the map and radar
  // put all the loading for the views here? use effect on view....

  useEffect(()=>{

    

  }, [view])



  return (
    <>
        <DashboardContent>
          <SideBarTabs/>

        {<PanelContent view={view}/>}

        {view !== "list_explore" && <>

          <GridContainer />
          <MapView/>
          <RadarView/>
      
      </>}

  

      {/* <Header/> */}

        </DashboardContent>
    </>
  );
};

export default Dashboard;



// const Dashboard = ({
//   // profile,
//   // setFlag,
//   // isBusinessOpen,
//   // businessExists,
//   // businessId,
//   // isUserOpen,
//   // userId,
//   view,
//   // detailId
// }) => {


           {/* <SideBarTabs
            // displayTab={displayTab}
            // setDisplayTab={setDisplayTab}
            // setFlag={setFlag}
            // view={view}
            // detailId={detailId}
          />  */}

