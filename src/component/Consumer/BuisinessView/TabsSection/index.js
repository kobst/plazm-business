import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles.css";
import PostsSection from "./PostsSection";
import EventsSection from "./EventsSection";
import {
  fetchEventsForTheDay,
  setCurrentDate,
} from "../../../../reducers/eventReducer";
import { useDispatch, useSelector } from "react-redux";

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const TabsSection = ({ profile, businessId }) => {
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business.business);

  /** to fetch current date events on tab change */
  const eventTabChange = () => {
    const days = ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"];
    dispatch(setCurrentDate());
    dispatch(
      fetchEventsForTheDay({
        date: new Date(),
        day: days[new Date().getDay()],
        businessId: business[0]._id,
      })
    );
  };
  return (
    <>
      <TabsSectionContent className="InnerTabs">
        <Tabs>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Media</Tab>
            <Tab onClick={() => eventTabChange()}>Events</Tab>
            <Tab>Messages</Tab>
          </TabList>

          <TabPanel>
            <PostsSection profile={profile} businessId={businessId} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <EventsSection businessId={businessId} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>
        </Tabs>
      </TabsSectionContent>
    </>
  );
};

export default TabsSection;
