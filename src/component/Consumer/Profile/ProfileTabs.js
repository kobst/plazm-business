import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  margin-top: 88px;
  ul {
    background-color: #2b2652 !important;
  }
`;

function ProfileTabs(props) {
  return (
    <TabsSectionContent className="InnerTabs">
      <Tabs>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Lists</Tab>
          <Tab>Favorites</Tab>
        </TabList>
        <TabPanel />
        <TabPanel />
        <TabPanel />
      </Tabs>
    </TabsSectionContent>
  );
}

export default ProfileTabs;
