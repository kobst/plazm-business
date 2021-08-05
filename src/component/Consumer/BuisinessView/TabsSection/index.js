import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles.css";
import PostsSection from "./PostsSection";
import EventsSection from "./EventsSection";
import {
  setCurrentDate,
} from "../../../../reducers/eventReducer";
import { useDispatch } from "react-redux";

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const TabsSection = ({ profile, businessId, setSelectedListId }) => {
  const dispatch = useDispatch();

  /** to fetch current date events on tab change */
  const eventTabChange = async () => {
    dispatch(setCurrentDate());
  };
  return (
    <>
      <TabsSectionContent className="InnerTabs">
        <Tabs>
          <TabList>
            <Tab>Posts</Tab>
            <Tab onClick={() => eventTabChange()}>Events</Tab>
          </TabList>

          <TabPanel>
            <PostsSection profile={profile} businessId={businessId} setSelectedListId={setSelectedListId}/>
          </TabPanel>
          <TabPanel>
            <EventsSection businessId={businessId} />
          </TabPanel>
        </Tabs>
      </TabsSectionContent>
    </>
  );
};

export default TabsSection;
