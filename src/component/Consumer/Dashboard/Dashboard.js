import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LeftBar from "../../UI/Consumer/LeftBar";
import SideBarTabs from "../../UI/Consumer/SideBarTabs/SideBarTabs";
import PanelContent from "../../UI/Consumer/Panel-Content/PanelContent";

import Header from "../../UI/Consumer/Header/Header";
import RightBar from "../Dashboard/RightBar";

import HomeSearch from "../HomeSearch";
import MyFeed from "../MyFeed";
import BuisinessView from "../BuisinessView";
import DiscoverList from "../DiscoverList";
import ListDetail from "../ListDescriptionView/ListDetail";
import Profile from "../Profile";

import GridContainer from "../GridComponents/index";
import MapView from "../mapView/index";
import RadarView from "../radarView/radarView";
import useStore from "../useState";
import GlobalSearch from "../GlobalSearch";
import GlobalSearchBox from "../GlobalSearch/GlobalSearchBox";
import { useSelector } from "react-redux";

const DashboardContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
`;
const BusinessSearch = styled.div`
    position: absolute;
    top: 60px;
    z-index: 11;
    right: 60px;
    width: 530px;
    @media (max-width: 1279px){
      right: inherit;
      width: 400px;
      left: 60px;
      top: 60px;
    }
    @media (max-width: 767px){
      width: 85%;
      top: 120px;
    }
}`;
const PanelContentContainer = styled.div`
  padding-left: 60px;
  width: 100%;
  position: relative;
  display: flex;
  height: calc(100vh - 70px);
  overflow: hidden;
  top: 60px;
  max-width: 620px;
  z-index: 1;
  background: #221e45;
  /* overflow: auto; */
`;
// const Dashboard = ({view}) => {

const Dashboard = () => {
  const gridMode = useStore((state) => state.gridMode);
  const view = useStore((state) => state.view);
  const detailId = useStore((state) => state.detailId);
  useEffect(() => {
    if (gridMode) {
      console.log("show grid");
    }
  }, [gridMode]);

  // put all the grid logic here?  for the map and radar ....
  //maybe not necessary as long as griContainer remains without conditional

  useEffect(() => {
    console.log(view);

    // put all the loading for the views here? use effect on view....
  }, [view]);
  return (
    <>
      <DashboardContent>
        <SideBarTabs />
        {view === "explore" && (
          <PanelContentContainer>
            <HomeSearch />
          </PanelContentContainer>
        )}

        {view == "my_feed" && (
          <PanelContentContainer>
            <MyFeed />
          </PanelContentContainer>
        )}

        {view === "business_detail" && (
          <PanelContentContainer>
            <BuisinessView businessId={detailId} />
          </PanelContentContainer>
        )}

        {view === "user_detail" && (
          <PanelContentContainer>
            <Profile userId={detailId} />
          </PanelContentContainer>
        )}
        {view === "list_detail" && (
          <PanelContentContainer>
            <ListDetail />
          </PanelContentContainer>
        )}
        {view === "list_explore" && <DiscoverList />}
        {(view === "explore" ||
          view === "my_feed" ||
          view === "business_detail") && <GlobalSearch />}
        <GridContainer />

        {view !== "list_explore" && (
          <>
            <MapView />
            <RadarView />
          </>
        )}

        {/* // works  */}
        {/* <PanelContent/> */}

        {/* {view !== "list_explore" && <>
          <GridContainer />
          <MapView/>
          <RadarView/>

      </>} */}

        <Header />
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

{
  /* <SideBarTabs
            // displayTab={displayTab}
            // setDisplayTab={setDisplayTab}
            // setFlag={setFlag}
            // view={view}
            // detailId={detailId}
          />  */
}
