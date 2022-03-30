import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import styled from "styled-components";

import {
  clearListSearchData,
  FetchMostPopularLists,
  FetchTrendingLists,
  setListSearch,
} from "../../../reducers/listReducer";
import ValueLoader from "../../../utils/loader";
import Input from "../../UI/Input/Input";
import SearchSection from "./SearchSection";
import SliderSection from "./SliderSection";
import error from "../../../constants";

import useStore from "../useState";

import {
  TopSectionWrap,
  LeftWrap,
  TotalNum,
  RightSearchWrap,
  ErrorDiv,
  LoaderWrap,
} from "./styled.js";
import NewInBuzzItems from "./ItemSectionSlider/SliderItems";

const TopContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  flex-direction: row;
  .react-tabs {
    width: 100%;
  }
  .react-tabs__tab-list {
    display: flex;
    justify-content: space-between;
    background: #18123a;
    border: 0;
    min-height: 60px;
    align-items: center;
    padding: 0 20px 0 60px;
    @media (max-width: 1024px) {
      padding: 0 10px 0 0px;
    }
    @media (max-width: 767px) {
      padding: 60px 10px 0 0px;
    }
    @media (max-width: 599px) {
      flex-direction: column;
      padding: 60px 10px 10px 0px;
    }
  }
  .react-tabs__tab-panel {
    padding: 0 60px;
    @media (max-width: 767px) {
      padding: 0 10px;
    }
  }
  .LeftTabsList {
    display: flex;
    height: 100%;
    @media (max-width: 599px) {
      margin: 0 0 10px 0;
    }
  }
  .react-tabs__tab {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    min-height: 60px;
    border: 0;
    padding: 0px 20px;
    @media (max-width: 991px) {
      font-size: 14px;
      padding: 0px 10px;
    }
    @media (max-width: 479px) {
      font-size: 11px;
      padding: 0px 5px;
    }
  }
  .react-tabs__tab--selected {
    background: #ff2e9a;
    color: #ffffff;
    border-radius: 0;
    border: 0;
    top: 0;
  }
  .react-tabs__tab:focus {
    box-shadow: none !important;
  }

  .react-tabs__tab:focus:after {
    display: none;
  }
`;

const ListMenu = (
  {
    // setDiscoverBtn,
    // setSelectedListId,
    // setReadMore
  }
) => {
  const dispatch = useDispatch();
  const loadindTrending = useSelector(
    (state) => state.list.loadingTrendingLists
  );
  const loadingPopular = useSelector((state) => state.list.loadingPopularLists);
  const trendingLists = useSelector((state) => state.list.trendingLists);
  const totalTrendingList = useSelector(
    (state) => state.list.totalTrendingList
  );
  const setListTabSelected = useStore((state) => state.setListTabSelected);
  const popularLists = useSelector((state) => state.list.popularLists);
  const popularLoading = useSelector((state) => state.list.loadingPopularLists);
  const totalPopularLists = useSelector(
    (state) => state.list.totalPopularLists
  );
  const user = useSelector((state) => state.user.user);
  const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);
  const userLists = listData.filter((i) => i.ownerId === user._id);
  const loading = useSelector((state) => state.list.loadingSearchList);
  const listSearch = useSelector((state) => state.list.listSearch);

  const [selectedTab, setSelectedTab] = useState(2);
  const [tabIndex, setTabIndex] = useState();
  const userCreatedLists = useSelector((state) => state.list.userLists);
  const userCreatedLoading = useSelector(
    (state) => state.list.loadingUserLists
  );
  const userFollowedLists = useSelector((state) => state.list.data);
  const [searchError, setSearchError] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffSet] = useState(0);
  const [offsetPopular, setOffSetPopular] = useState(0);
  const [offsetSearch, setOffSetSearch] = useState(0);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(true);
  const [displayTrendingModel, setDisplayTrendingModel] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [totalLists, setTotalLists] = useState(
    parseInt(totalList - userLists.length)
  );

  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
  const setReadMore = useStore((state) => state.setReadMore);

  useEffect(() => {
    const fetchData = async () => {
      /** to fetch most trending list data */
      const trending = await dispatch(FetchTrendingLists(0));
      const resTrending = await unwrapResult(trending);
      /** to fetch most popular list data */
      const popular = await dispatch(FetchMostPopularLists(0));
      const resPopular = await unwrapResult(popular);
      if (resPopular) {
        setFlag(false);
      }
    };
    (offset === 0 || offsetPopular === 0) && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** search data */
  const searchListsData = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!search.trim()) {
        dispatch(setListSearch(event.target.value));
      }
      if (search !== "" && search.length >= 4 && !search.trim() === false) {
        dispatch(clearListSearchData());
        dispatch(setListSearch(event.target.value));
        setSearchError("");
        setOffSetSearch(0);
      } else if (search.length >= 0 && search.length < 4) {
        setSearchError(error.SEARCH_ERROR);
      }
    }
  };

  /** to set search value */
  useEffect(() => {
    setSearch(listSearch);
  }, [listSearch]);

  /** back btn */
  const backBtn = () => {
    if (listSearch === "") {
      setDiscoverBtn(false);
    } else {
      dispatch(setListSearch(""));
      setSearch("");
    }
  };

  const setTab = (index) => {
    setSearch("");
    dispatch(clearListSearchData());
    dispatch(setListSearch(""));
    setTabIndex(index);
    setSearchError("");
    setSelectedTab(index);
    setListTabSelected(index);
  };

  const handleSearchChange = (e) => {
    setSearchError("");
    setSearch(e.target.value);
  };

  return (
    <>
      <TopContent>
        <Tabs selectedIndex={selectedTab} onSelect={setTab}>
          <TabList>
            <div className="LeftTabsList">
              <Tab>Lists Subscribed</Tab>
              <Tab>My Lists</Tab>
              <Tab>Discover More</Tab>
            </div>
            <RightSearchWrap>
              <Input
                value={search}
                onKeyPress={(event) => searchListsData(event)}
                onChange={handleSearchChange}
                className="SearchSubscriptionsInput"
                placeholder="Search Lists"
                disabled={loading}
              />
              {searchError && (
                <ErrorDiv className="list-error">{searchError}</ErrorDiv>
              )}
            </RightSearchWrap>
          </TabList>
          <TabPanel index={0}>
            {!listSearch && (
              <SliderSection
                heading="Subscribed Lists"
                data={userFollowedLists}
                totalList={totalPopularLists}
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetPopular}
                setOffSet={setOffSetPopular}
                loader={loader}
                setLoader={setLoader}
                modal={displayTrendingModel}
                setModal={setDisplayTrendingModel}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
                setTotalLists={setTotalLists}
                totalLists={totalLists}
              />
            )}
            {listSearch && (
              <SearchSection
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetSearch}
                setOffSet={setOffSetSearch}
                obj={{ subscriberId: user._id }}
              />
            )}
          </TabPanel>
          <TabPanel index={1}>
            {!listSearch && (
              <SliderSection
                heading="My Lists"
                data={userCreatedLists}
                totalList={totalPopularLists}
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetPopular}
                setOffSet={setOffSetPopular}
                loader={loader}
                setLoader={setLoader}
                modal={displayTrendingModel}
                setModal={setDisplayTrendingModel}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
                setTotalLists={setTotalLists}
                totalLists={totalLists}
              />
            )}
            {listSearch && (
              <SearchSection
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetSearch}
                setOffSet={setOffSetSearch}
                obj={{ userId: user._id }}
              />
            )}
          </TabPanel>
          <TabPanel index={2}>
            {!listSearch && !popularLoading && popularLists.length && (
              <SliderSection
                heading="Most Popular"
                data={popularLists}
                totalList={totalPopularLists}
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetPopular}
                setOffSet={setOffSetPopular}
                loader={loader}
                setLoader={setLoader}
                modal={displayTrendingModel}
                setModal={setDisplayTrendingModel}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
                setTotalLists={setTotalLists}
                totalLists={totalLists}
              />
            )}
            {listSearch && (
              <SearchSection
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                setReadMore={setReadMore}
                offset={offsetSearch}
                setOffSet={setOffSetSearch}
                obj={{}}
              />
            )}
            {(popularLoading || userCreatedLoading) && !listSearch && (
              <div style={{ textAlign: "center" }}>
                <ValueLoader />
              </div>
            )}
          </TabPanel>
        </Tabs>
      </TopContent>
    </>
  );
};

export default ListMenu;

//   <TopSectionWrap>
//   <LeftWrap>
//     <button className="BackButtonArrow" onClick={() => backBtn()}>
//       <MdChevronLeft />
//     </button>
//     <TotalNum>
//       Total No. of Subscribed Lists : <span>{totalLists}</span>
//     </TotalNum>
//   </LeftWrap>
//   <RightSearchWrap>
//     <Input
//       value={search}
//       onKeyPress={(event) => searchListsData(event)}
//       onChange={(e) => setSearch(e.target.value)}
//       className="SearchSubscriptionsInput"
//       placeholder="Search Lists"
//       disabled={loading}
//     />
//   </RightSearchWrap>
// </TopSectionWrap>
