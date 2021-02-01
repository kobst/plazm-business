import React, { useState } from "react";
import styled from "styled-components"
import './styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PlazmLogo from '../../../../images/plazm_logo.jpg';
import LocalNav from '../../../../images/LocalNav.png';
import ProfileImg from '../../../../images/profile-img.png';
import Mention from '../../../../images/Mentions.png';
import Notifications from '../../../../images/notifications.png';
import Favorites from '../../../../images/favorites.png';
import GridIcon from '../../../../images/Grid_icon.png';
import ProfileSettingImg from '../../../../images/Profile_Setting.png';
import { BiSearchAlt2 } from "react-icons/bi";
import ChangePassword from '../../../Curator/ChangePassword'
import ProfileSettings from '../../../Curator/ProfileSettings'

const LeftBarContent = styled.div`
    width:100px;
    position: relative;
    display:flex;
    background: #F3F3F3;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    @media (max-width:767px){
      width:50px;
    }
`
const UserImage = styled.div`
    width: 50px;
    height: 50px;
    border: 3px solid #ff2a88;
    position: relative;
    overflow: hidden;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width:767px){
      width: 30px;
      height: 30px;
    }
`

const SearchIcon = styled.div`
    width: 36px;
    svg{
        color: #767676;
        font-size: 38px;
        @media (max-width:767px){
          font-size: 30px;
        }
    }
    
`

const LeftBar = ({displayTab,setDisplayTab}) => {
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  return (
    <>
      <LeftBarContent>
      <Tabs>
        <TabList>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={PlazmLogo} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={LocalNav} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <UserImage>
                <img src={ProfileImg} alt="" />
            </UserImage>
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <SearchIcon>
                <BiSearchAlt2 />
            </SearchIcon>
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={Mention} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={Notifications} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={Favorites} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)}>
            <img src={GridIcon} alt="" />
          </Tab>
          <Tab onClick={()=>setDisplayTab(true)} style={displayTab === false?{background:"#f3f3f3"}:{background:""}}>
            <img src={ProfileSettingImg} alt="" />
          </Tab>
        </TabList>

        {displayTab ===  true?<TabPanel>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 6</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 7</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            <h2>Any content 8</h2>
          </div>
        </TabPanel>:<></>}
        {displayTab ===  true?<TabPanel>
          <div className="panel-content">
            {displayChangePassword === true ?<ChangePassword setDisplayChangePassword={setDisplayChangePassword} setDisplayTab={setDisplayTab}/>:
            <ProfileSettings setDisplayChangePassword={setDisplayChangePassword} setDisplayTab={setDisplayTab}/>}
          </div>
        </TabPanel>:<></>}
      </Tabs>
      </LeftBarContent>
    </>
  )
}
  
export default LeftBar