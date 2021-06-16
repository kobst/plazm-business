import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BuisinessHeader from "./BuisinessHeader";
import TabsSection from "./TabsSection";
import BuisinessHeaderNotClaimed from "./BuisinessHeaderNotClaimed";
import { useDispatch, useSelector } from "react-redux";
import BuisinessProfileDetails from "./BuisinessProfileDetails";
import ValueLoader from "../../../utils/loader";
import { setSideFilters } from "../../../reducers/businessReducer";

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

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

const BuisinessView = ({
  setDisplayTab,
  profile,
  businessExists,
  businessId,
  searchIndex,
  setTabIndex,
  setSearchIndex,
  myFeedIndex,
  setMyFeedIndex,
  listIndex,
  setListIndex,
  favoriteIndex,
  setFavoriteIndex
}) => {
  const loading = useSelector((state) => state.business.loading);
  const businessProfile = useSelector((state) => state.business.business);
  const [displayBusinessProfile, setDisplayBusinessProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSideFilters());
  }, [dispatch]);
  return (
    <>
      {!loading &&
      !businessExists &&
      businessProfile &&
      businessProfile.length === 0 ? (
        <h3>Business Does Not Exist</h3>
      ) : loading ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BuisinessViewContent>
          {businessProfile &&
          businessProfile.length > 0 &&
          businessProfile[0].userSub !== null ? (
            displayBusinessProfile ? (
              <BuisinessProfileDetails
                displayBusinessProfile={displayBusinessProfile}
                setDisplayBusinessProfile={setDisplayBusinessProfile}
                setDisplayTab={setDisplayTab}
              />
            ) : (
              <BuisinessHeader
                setDisplayTab={setDisplayTab}
                setDisplayBusinessProfile={setDisplayBusinessProfile}
                searchIndex={searchIndex}
                setTabIndex={setTabIndex}
                setSearchIndex={setSearchIndex}
                myFeedIndex={myFeedIndex}
                setMyFeedIndex={setMyFeedIndex}
                listIndex={listIndex}
                setListIndex={setListIndex}
                favoriteIndex={favoriteIndex}
                setFavoriteIndex={setFavoriteIndex}
              />
            )
          ) : displayBusinessProfile ? (
            <BuisinessProfileDetails
              displayBusinessProfile={displayBusinessProfile}
              setDisplayBusinessProfile={setDisplayBusinessProfile}
              setDisplayTab={setDisplayTab}
            />
          ) : (
            <BuisinessHeaderNotClaimed
              setDisplayTab={setDisplayTab}
              setDisplayBusinessProfile={setDisplayBusinessProfile}
              searchIndex={searchIndex}
              setTabIndex={setTabIndex}
              setSearchIndex={setSearchIndex}
              myFeedIndex={myFeedIndex}
              setMyFeedIndex={setMyFeedIndex}
              favoriteIndex={favoriteIndex}
              setFavoriteIndex={setFavoriteIndex}
              listIndex={listIndex}
              setListIndex={setListIndex}
            />
          )}
          {!displayBusinessProfile ? (
            <TabsSection profile={profile} businessId={businessId} />
          ) : null}
        </BuisinessViewContent>
      )}
    </>
  );
};

export default BuisinessView;
