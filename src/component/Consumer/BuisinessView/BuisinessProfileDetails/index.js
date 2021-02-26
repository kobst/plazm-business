import React, { useState } from "react";
import styled from "styled-components";
import BuisinessHeader from "../BuisinessHeader";
import BuisinessProfileSection from "../BuisinessProfileSection";
import BuisinessProfileDescription from "../BuisinessProfileDescription";
import BuisinessHeaderNotClaimed from "../BuisinessHeaderNotClaimed";
import { useSelector } from "react-redux";

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const BottomContent = styled.div`
  padding: 35px;
  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const BuisinessProfileDetails = ({
  setDisplayBusinessProfile,
  setDisplayTab,
}) => {
  const businessProfile = useSelector((state) => state.business.business)[0];
  return (
    <>
      <BuisinessViewContent>
        {businessProfile.userSub !== null ? (
          <BuisinessHeader
            isProfile={true}
            setDisplayBusinessProfile={setDisplayBusinessProfile}
            setDisplayTab={setDisplayTab}
          />
        ) : (
          <BuisinessHeaderNotClaimed
            isProfile={true}
            setDisplayBusinessProfile={setDisplayBusinessProfile}
            setDisplayTab={setDisplayTab}
          />
        )}
        <BottomContent>
          <BuisinessProfileSection setDisplayBusinessProfile={setDisplayBusinessProfile} />
          <BuisinessProfileDescription  />
        </BottomContent>
      </BuisinessViewContent>
    </>
  );
};

export default BuisinessProfileDetails;
