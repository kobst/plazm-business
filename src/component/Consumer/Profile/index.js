import React from 'react';
import ReactDOM from 'react-dom';
import ProfileLock from "../../Consumer/Profile/ProfileLock";
import ProfileDetail from "../../Consumer/Profile/ProfileDetail";
import ProfileTabs from "../../Consumer/Profile/ProfileTabs";

class ProfileContent extends React.Component {
  render() {
    return (
       <div>
           <ProfileDetail />
           <ProfileTabs />
           <ProfileLock />
       </div>
    )
  }
}

export default ProfileContent;