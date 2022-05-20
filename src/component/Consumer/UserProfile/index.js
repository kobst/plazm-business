import React, { useEffect, useState } from "react";
import {
  UserProfileBody,
  UserProfileContainer,
  ProfileTopBanner,
  BackgroundOpacity,
  PanelContent,
  LeftPanel,
  TopProfileDetails,
  UserProfileImg,
  UserProfileName,
  UserProfileDescription,
  BottomButtonList,
  ListButtons,
  RightPanel,
} from "./styled.js";
import { BsGrid } from "react-icons/bs";
import { FaList } from "react-icons/fa";

const UserProfile = ({}) => {
  return (
    <UserProfileBody>
      <UserProfileContainer>
        <ProfileTopBanner>
          <img src="https://picsum.photos/seed/picsum/200/300" />
          <BackgroundOpacity />
        </ProfileTopBanner>
        <PanelContent>
          <LeftPanel>
            <TopProfileDetails>
              <UserProfileImg>
                <img src="https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY" />
              </UserProfileImg>
              <UserProfileName>
                Brooklyn Simmons <span>25 lists</span>
              </UserProfileName>
              <UserProfileDescription>
                UX Consultant | UI Designer | Motion Graphics Artist | Food
                Lover | Avid Reader | Mountain Biking | Rock Music
              </UserProfileDescription>
            </TopProfileDetails>
            <BottomButtonList>
              <ListButtons>
                <FaList />
                Brooklyn’s Lists
              </ListButtons>
              <ListButtons>
                <BsGrid />
                Subscribed Lists
              </ListButtons>
            </BottomButtonList>
          </LeftPanel>
          <RightPanel></RightPanel>
        </PanelContent>
      </UserProfileContainer>
    </UserProfileBody>
  );
};

export default UserProfile;
