import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BuisinessHeader from "./BuisinessHeader";
import TabsSection from "./TabsSection";
import BuisinessHeaderNotClaimed from "./BuisinessHeaderNotClaimed";
import { useDispatch, useSelector } from "react-redux";
import BuisinessProfileDetails from "./BuisinessProfileDetails";
import ValueLoader from "../../../utils/loader";
import { setSideFilters, setFilters } from "../../../reducers/businessReducer";
import useStore from "../useState/index";
import GlobalSearchBox from "../GlobalSearch/GlobalSearchBox";

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-left: 10px;
  background: #170c1d;
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

const BusinessWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BuisinessView = ({
  setDisplayTab,
  // profile,
  // businessExists,
  businessId,
  // searchIndex,
  // setTabIndex,
  // setSearchIndex,
  // myFeedIndex,
  // setMyFeedIndex,
  // listIndex,
  // setListIndex,
  // favoriteIndex,
  // setFavoriteIndex,
  // setSelectedListId,
}) => {
  const loading = useSelector((state) => state.business.loading);
  const showSearchBar = useSelector((state) => state.globalSearch.displayBar);
  const businessProfile = useSelector((state) => state.business.business);
  const flag = useSelector((state) => state.business.flag);
  const [displayBusinessProfile, setDisplayBusinessProfile] = useState(false);
  const setSelectedPlace = useStore((state) => state.setSelectedPlace);
  const setDetailView = useStore((state) => state.setDetailView);
  // const businessProfile = useStore((state) => state.businessDetailProfile)

  useEffect(() => {
    if (businessProfile[0]) {
      let deepClone = JSON.parse(JSON.stringify(businessProfile[0]));
      deepClone.businessLocation = deepClone.location;

      // console.log("XXXX   business view coordinates XXXXX");
      // console.log(deepClone);

      setDetailView(true);
      setSelectedPlace(deepClone);
    }
  }, [businessProfile]);

  useEffect(() => {
    return () => {
      console.log(" no business view - unmount");
      setDetailView(false);
      setSelectedPlace(null);
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setSideFilters());
    dispatch(
      setFilters({
        Business: false,
        PostsByMe: true,
        MySubscriptions: false,
        Others: false,
      })
    );
  }, [dispatch]);
  return (
    <>
      {!loading &&
      // !businessExists &&
      ((!flag && businessProfile && businessProfile.length === 0) ||
        (!businessProfile && !loading)) ? (
        <h3>Business Does Not Exist</h3>
      ) : loading ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BusinessWrap>
          <div style={{ width: "100%" }}>
            {showSearchBar && (
              <GlobalSearchBox setOffset={() => {}} type={"Business Search"} />
            )}
          </div>
          <div style={{ width: "100%", height: "100vh" }}>
            <BuisinessViewContent>
              {businessProfile &&
                businessProfile.length > 0 &&
                (displayBusinessProfile ? (
                  <BuisinessProfileDetails
                    displayBusinessProfile={displayBusinessProfile}
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
                  <BuisinessHeader
                    setDisplayTab={setDisplayTab}
                    setDisplayBusinessProfile={setDisplayBusinessProfile}
                    // searchIndex={searchIndex}
                    // setTabIndex={setTabIndex}
                    // setSearchIndex={setSearchIndex}
                    // myFeedIndex={myFeedIndex}
                    // setMyFeedIndex={setMyFeedIndex}
                    // listIndex={listIndex}
                    // setListIndex={setListIndex}
                    // favoriteIndex={favoriteIndex}
                    // setFavoriteIndex={setFavoriteIndex}
                  />
                ))}
              {!displayBusinessProfile &&
                !loading &&
                businessProfile &&
                businessProfile.length > 0 && (
                  <TabsSection
                    // profile={profile}
                    businessId={businessId}
                    // setSelectedListId={setSelectedListId}
                  />
                )}
            </BuisinessViewContent>
          </div>
        </BusinessWrap>
      )}
    </>
  );
};

export default BuisinessView;
