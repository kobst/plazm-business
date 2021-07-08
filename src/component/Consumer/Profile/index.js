import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProfileLock from "../../Consumer/Profile/ProfileLock";
import ProfileDetail from "../../Consumer/Profile/ProfileDetail";
import ProfileTabs from "../../Consumer/Profile/ProfileTabs";
import ValueLoader from "../../../utils/loader";
import { fetchUserProfileData } from "../../../reducers/userReducer";

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

const ProfileContent = ({ userId, setDisplayTab, setProfileClosed }) => {
  const loading = useSelector((state) => state.user.loadingProfile);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.selectedUser);
  /** to fetch profile information */
  useEffect(() => {
    dispatch(fetchUserProfileData(userId));
  }, [dispatch, userId]);
  return loading ? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : userProfile !== null ? (
    <div>
      <ProfileDetail setDisplayTab={setDisplayTab} setProfileClosed={setProfileClosed}/>
      <ProfileTabs />
      <ProfileLock />
    </div>
  ) : null;
};

export default ProfileContent;
