import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PlazmLogo from "../../../../images/plazm_logo.jpg";
import LocalNav from "../../../../images/LocalNav.png";
import ProfileImg from "../../../../images/profile-img.png";
import Mention from "../../../../images/Mentions.png";
import Notifications from "../../../../images/notifications.png";
import Favorites from "../../../../images/Left-favourite.png";
import GridIcon from "../../../../images/Grid_icon.png";
import ProfileSettingImg from "../../../../images/Profile_Setting.png";
import { BiSearchAlt2 } from "react-icons/bi";
import ChangePassword from "../../../Consumer/ChangePassword";
import ProfileSettings from "../../../Consumer/ProfileSettings";
import BuisinessView from "../../../Consumer/BuisinessView";
import BusinessList from "../../../Consumer/BusinessList";
import { useSelector } from "react-redux";
import MyFeed from "../../../Consumer/MyFeed";
import HomeSearch from "../../../Consumer/HomeSearch";

const LeftBarContent = styled.div`
  width: 100px;
  position: relative;
  display: flex;
  /* background: #F3F3F3; */
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  @media (max-width: 767px) {
    width: 50px;
  }
`;

const UserImage = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #ff2a88;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const SearchIcon = styled.div`
  width: 36px;
  svg {
    color: #767676;
    font-size: 38px;
    @media (max-width: 767px) {
      font-size: 30px;
    }
  }
`;

const LeftBar = ({
  profile,
  setFlag,
  isBusinessOpen,
  businessExists,
  businessId,
}) => {
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(isBusinessOpen ? 6 : 0);
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <LeftBarContent className="MainTabs">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab
              className={
                0 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 0
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 0
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={PlazmLogo} alt="" />
            </Tab>
            <Tab
              className={
                1 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex === 1
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={LocalNav} alt="" />
            </Tab>
            <Tab
              className={
                2 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 2
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 2
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <UserImage>
                <img src={user.photo ? user.photo : ProfileImg} alt="" />
              </UserImage>
            </Tab>
            <Tab
              className={
                3 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 3
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 3
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <SearchIcon>
                <BiSearchAlt2 />
              </SearchIcon>
            </Tab>
            <Tab
              className={
                4 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 4
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 4
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={Mention} alt="" />
            </Tab>
            <Tab
              className={
                5 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 5
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 5
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={Notifications} alt="" />
            </Tab>
            <Tab
              className={
                6 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 6
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 6
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={Favorites} alt="" />
            </Tab>
            <Tab
              className={
                7 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 7
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 7
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={GridIcon} alt="" />
            </Tab>
            <Tab
              className={
                8 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 8
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 8
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={ProfileSettingImg} alt="" />
            </Tab>
            <Tab
              className={
                9 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 9
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 9
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              &nbsp;
            </Tab>
            <Tab
              className={
                10 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 10
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 10
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              &nbsp;
            </Tab>
          </TabList>

          <TabPanel></TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 2</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <HomeSearch/>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 4</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <MyFeed setDisplayTab={() => setTabIndex(0)} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 6</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {isBusinessOpen === true ? (
                <BuisinessView
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  businessExists={businessExists}
                  businessId={businessId}
                />
              ) : (
                <BusinessList setDisplayTab={() => setTabIndex(0)} />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 8</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {displayChangePassword === true ? (
                <ChangePassword
                  setDisplayChangePassword={setDisplayChangePassword}
                  setDisplayTab={() => setTabIndex(0)}
                />
              ) : (
                <ProfileSettings
                  setDisplayChangePassword={setDisplayChangePassword}
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  setFlag={setFlag}
                />
              )}
            </div>
          </TabPanel>
        </Tabs>
      </LeftBarContent>
    </>
  );
};

export default LeftBar;
