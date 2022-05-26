import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import "./styles.css";
import PostsSection from "./PostsSection";
import EventsSection from "./EventsSection";
import { setCurrentDate } from "../../../../reducers/eventReducer";
import useStore from "../../useState";

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const TabsSection = ({ profile, businessId }) => {
  const dispatch = useDispatch();
  const topEvent = useSelector((state) => state.event.topEvent);
  const [selectedIndex, setSelectedIndex] = useState(topEvent ? 1 : 0);

  /** to fetch current date events on tab change */
  const eventTabChange = async () => {
    dispatch(setCurrentDate());
  };
  return (
    <>
      <TabsSectionContent className="InnerTabs">
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <TabList>
            <Tab>Posts</Tab>
            <Tab onClick={() => eventTabChange()}>Events</Tab>
          </TabList>

          <TabPanel>
            <PostsSection
              // profile={profile}
              businessId={businessId}
              // setSelectedListId={setSelectedListId}
            />
          </TabPanel>
          <TabPanel>
            <EventsSection
              businessId={businessId}
              // setSelectedListId={setSelectedListId}
            />
          </TabPanel>
        </Tabs>
      </TabsSectionContent>
    </>
  );
};

export default TabsSection;
