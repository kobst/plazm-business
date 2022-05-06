import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import BuisinessHeader from '../BuisinessHeader';
import BuisinessProfileSection from '../BuisinessProfileSection';
import BuisinessProfileDescription from '../BuisinessProfileDescription';
import BuisinessHeaderNotClaimed from '../BuisinessHeaderNotClaimed';

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const BottomContent = styled.div`
  padding: 35px;
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s; /* Firefox */
  -webkit-animation: fadein 0.5s; /* Safari and Chrome */
  -o-animation: fadein 0.5s; /* Opera */
  @media (max-width: 767px) {
    padding: 15px;
  }
`;

function BuisinessProfileDetails({
  setDisplayBusinessProfile,
  setDisplayTab,
  displayBusinessProfile,
  // searchIndex,
  // setTabIndex,
  // setSearchIndex,
  // myFeedIndex,
  // setMyFeedIndex,
  // listIndex,
  // setListIndex,
  // favoriteIndex,
  // setFavoriteIndex,
}) {
  const businessProfile = useSelector((state) => state.business.business)[0];
  return (
    <BuisinessViewContent>
      {businessProfile.userSub !== null ? (
        <BuisinessHeader
          displayBusinessProfile={displayBusinessProfile}
          isProfile
          setDisplayBusinessProfile={setDisplayBusinessProfile}
          setDisplayTab={setDisplayTab}
        />
      ) : (
        <BuisinessHeaderNotClaimed
          isProfile
          setDisplayBusinessProfile={setDisplayBusinessProfile}
          setDisplayTab={setDisplayTab}
        />
      )}
      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax="calc(100vh - 300px)"
        thumbMinSize={30}
        className="InnerScroll"
      >
        <BottomContent>
          <BuisinessProfileSection
            setDisplayBusinessProfile={setDisplayBusinessProfile}
          />
          <BuisinessProfileDescription />
        </BottomContent>
      </Scrollbars>
    </BuisinessViewContent>
  );
}

export default BuisinessProfileDetails;
