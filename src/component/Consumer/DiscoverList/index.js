import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
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

const DiscoverList = ({ 
  // setDiscoverBtn, 
  // setSelectedListId, 
  // setReadMore 
  }) => {
  const dispatch = useDispatch();
  const loadindTrending = useSelector(
    (state) => state.list.loadingTrendingLists
  );
  const loadingPopular = useSelector((state) => state.list.loadingPopularLists);
  const trendingLists = useSelector((state) => state.list.trendingLists);
  const totalTrendingList = useSelector(
    (state) => state.list.totalTrendingList
  );
  const popularLists = useSelector((state) => state.list.popularLists);
  const totalPopularLists = useSelector(
    (state) => state.list.totalPopularLists
  );
  const user = useSelector((state) => state.user.user);
  const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);
  const userLists = listData.filter((i) => i.ownerId === user._id);
  const loading = useSelector((state) => state.list.loadingSearchList);
  const listSearch = useSelector((state) => state.list.listSearch);



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


  const setSelectedListId = useStore((state)=> state.setSelectedListId)
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn)
  const setReadMore = useStore((state) => state.setReadMore)




  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching trendibg lists")
      /** to fetch most trending list data */
      const trending = await dispatch(FetchTrendingLists(0));
      const resTrending = await unwrapResult(trending);
      /** to fetch most popular list data */
      const popular = await dispatch(FetchMostPopularLists(0));
      const resPopular = await unwrapResult(popular);
      if (resTrending && resPopular) {
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
  return (!loadindTrending && !flag) || (!loadingPopular && !flag) ? (
    <>
      <TopSectionWrap>
        <LeftWrap>
          <button className="BackButtonArrow" onClick={() => backBtn()}>
            <MdChevronLeft />
          </button>
          <TotalNum>
            Total No. of Subscribed Lists : <span>{totalLists}</span>
          </TotalNum>
        </LeftWrap>
        <RightSearchWrap>
          <Input
            value={search}
            onKeyPress={(event) => searchListsData(event)}
            onChange={(e) => setSearch(e.target.value)}
            className="SearchSubscriptionsInput"
            placeholder="Search Lists"
            disabled={loading}
          />
        </RightSearchWrap>
      </TopSectionWrap>
      {searchError !== "" ? <ErrorDiv>{searchError}</ErrorDiv> : null}
      {listSearch !== "" && !listSearch.trim() === false ? (
        <SearchSection
          setSelectedListId={setSelectedListId}
          setDiscoverBtn={setDiscoverBtn}
          setReadMore={setReadMore}
          offset={offsetSearch}
          setOffSet={setOffSetSearch}
        />
      ) : (
        <>
          {/* <SliderSection
            heading="Trending"
            data={trendingLists}
            totalList={totalTrendingList}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
            offset={offset}
            setOffSet={setOffSet}
            loader={loader}
            setLoader={setLoader}
            modal={displayTrendingModel}
            setModal={setDisplayTrendingModel}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            setTotalLists={setTotalLists}
            totalLists={totalLists}
          /> */}
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
        </>
      )}
    </>
  ) : (
    <LoaderWrap className="DiscoverLoaderWrap">
      <ValueLoader />
    </LoaderWrap>
  );
};

export default DiscoverList;
