import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import { fetchUserProfileData } from "../../../reducers/userReducer";
import ValueLoader from "../../../utils/loader";
import ProfileImg from "../../../images/profile-img.png";

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

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 15px;
  }
  h3 {
    color: #ffffff;
    padding: 0;
    margin: 0 0 15px;
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 18px;
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    svg {
      font-size: 12px;
    }
  }
  p {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 10px;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
  .dashed {
    border-bottom: 0.5px dashed #ffffff;
    margin-bottom: 2%;
  }

  input {
    border: 0;
  }
`;

const HeadingWrap = styled.div`
  padding: 30px;
`;

const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const ProfileThumb = styled.div`
  width: 45px;
  height: 45px;
  margin: 0 10px 0 0;
  border: 3px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 45px;
    height: 45px;
  }
`;

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 25px 5px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 0px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 0px 0;
  font-weight: 700;
  color: #ff2e9a;
  svg {
    color: #ff0000;
    margin: 0;
  }
  div {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  div {
    cursor: pointer;
  }
  .ListName {
    max-width: calc(100% - 95px);
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0 0 5px;
    }
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0 0;
`;

const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
`;
const UserLockedProfile = ({ setDisplayTab }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loadingProfile);
  const userProfile = useSelector((state) => state.user.selectedUser);

  /** to fetch profile information */
  useEffect(() => {
    dispatch(fetchUserProfileData("601a9d257067bc1dea73529f"));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : userProfile !== null ? (
        <BuisinessViewContent>
          <HeadingWrap>
            <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv>
            <ProfileNameHeader>
              <ProfileThumb>
                {" "}
                <img
                  src={userProfile.photo ? userProfile.photo : ProfileImg}
                  alt=""
                />{" "}
              </ProfileThumb>
              <ProfileNameWrap>
                <ProfileName>
                  <div>{userProfile.name}</div>
                  <br />
                  <div>
                    {userProfile.totalPosts}
                    <span>Posts</span>
                  </div>
                  <br />
                  <div>
                    {userProfile.totalLists}
                    <span>Lists Created By Me</span>
                  </div>
                  <br />
                  <div>
                    {userProfile.listFollowed
                      ? userProfile.listFollowed.length
                      : 0}
                    <span>List followed By Me</span>
                  </div>
                  <br />
                </ProfileName>
              </ProfileNameWrap>
            </ProfileNameHeader>
          </HeadingWrap>
          <TabsSectionContent className="InnerTabs">
            <Tabs>
              <TabList>
                <Tab>Posts</Tab>
                <Tab>Lists</Tab>
                <Tab>Favorites</Tab>
              </TabList>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </Tabs>
          </TabsSectionContent>
        </BuisinessViewContent>
      ) : null}
    </>
  );
};

export default UserLockedProfile;
