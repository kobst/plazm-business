import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import "./styles.css";
import PostsSection from "./PostsSection";
import EventsSection from "./EventsSection";
import { setCurrentDate } from "../../../../reducers/eventReducer";
import ModalComponent from "../../UI/Modal";
import AddPostModal from "../../AddPostModal";

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;

const TabsSection = ({businessId}) => {
  const [addPostModal, setAddPostModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const dispatch = useDispatch();
  const topEvent = useSelector((state) => state.event.topEvent);
  const [selectedIndex, setSelectedIndex] = useState(topEvent ? 1 : 0);

  /** to fetch current date events on tab change */
  const eventTabChange = async () => {
    dispatch(setCurrentDate());
  };
  const onTabSelect = (index) => {
    if(index === 3) {
      return;
    }
    setSelectedIndex(index)
  }
  return (
    <>
      {addPostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addPostModal}
          closeModal={() => setAddPostModal(false)}
        >
          <AddPostModal
            businessId={businessId}
            closeModal={() => setAddPostModal(false)}
          />
        </ModalComponent>
      )}
      <TabsSectionContent className="InnerTabs">
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => onTabSelect(index)}
        >
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Media</Tab>
            <Tab onClick={() => eventTabChange()}>Events</Tab>
            <Tab onClick={() => {selectedIndex === 2 ? setAddEventModal(true) : setAddPostModal(true)}}>
              <span>+</span> {selectedIndex === 2 ? 'Create Event' : 'Create Post'}
            </Tab>
          </TabList>

          <TabPanel>
            <PostsSection
              businessId={businessId}
            />
          </TabPanel>
          <TabPanel>Media Upcoming</TabPanel>
          <TabPanel>
            <EventsSection
              businessId={businessId}
              addEventModal={addEventModal} 
              setAddEventModal={(v) => setAddEventModal(v)}
            />
          </TabPanel>
          <TabPanel>Post Upcoming</TabPanel>
        </Tabs>
      </TabsSectionContent>
    </>
  );
};

export default TabsSection;
