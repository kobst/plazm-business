import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
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

const BuisinessProfileDetails = ({
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
}) => {
  const businessProfile = useSelector((state) => state.business.business)[0];
  return (
    <>
      <BuisinessViewContent>
        {businessProfile.userSub !== null ? (
          <BuisinessHeader
            displayBusinessProfile={displayBusinessProfile}
            isProfile={true}
            setDisplayBusinessProfile={setDisplayBusinessProfile}
            setDisplayTab={setDisplayTab}
            // searchIndex={searchIndex}
            // setTabIndex={setTabIndex}
            // setSearchIndex={setSearchIndex}
            // myFeedIndex={myFeedIndex}
            // setMyFeedIndex={setMyFeedIndex}
            // favoriteIndex={favoriteIndex}
            // setFavoriteIndex={setFavoriteIndex}
            // listIndex={listIndex}
            // setListIndex={setListIndex}
          />
        ) : (
          <BuisinessHeaderNotClaimed
            isProfile={true}
            setDisplayBusinessProfile={setDisplayBusinessProfile}
            setDisplayTab={setDisplayTab}
            // searchIndex={searchIndex}
            // setTabIndex={setTabIndex}
            // setSearchIndex={setSearchIndex}
            // myFeedIndex={myFeedIndex}
            // setMyFeedIndex={setMyFeedIndex}
            // favoriteIndex={favoriteIndex}
            // setFavoriteIndex={setFavoriteIndex}
            // listIndex={listIndex}
            // setListIndex={setListIndex}
          />
        )}
        <Scrollbars
          autoHeight
          autoHeightMin={0}
          autoHeightMax={'calc(100vh - 150px)'}
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
    </>
  );
};

export default BuisinessProfileDetails;
