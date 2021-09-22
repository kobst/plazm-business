import React, { useEffect, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
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
import {
  TopSectionWrap,
  LeftWrap,
  TotalNum,
  RightSearchWrap,
  ErrorDiv,
  LoaderWrap,
} from "./styled.js";

const DiscoverList = ({ setDiscoverBtn, setSelectedListId, setReadMore }) => {
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     /** to fetch most trending list data */
  //     dispatch(FetchTrendingLists(0));
  //     /** to fetch most popular list data */
  //     dispatch(FetchMostPopularLists(0));
  //   };
  //   fetchData();
  // }, []);

  /** search data */
  const searchListsData = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (search !== "" && search.length >= 1 && !search.trim() === false) {
        dispatch(clearListSearchData());
        dispatch(setListSearch(event.target.value));
        setSearchError("");
      } else if (search.length >= 0 && search.length < 1) {
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
  return (
    <>
      <TopSectionWrap>
        <LeftWrap>
          <button className="BackButtonArrow" onClick={() => backBtn()}>
            <MdChevronLeft />
          </button>
          <TotalNum>
            Total No. of Subscribed Lists :{" "}
            <span>{parseInt(totalList - userLists.length)}</span>
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
        />
      ) : (
        <>
          <SliderSection
            heading="Trending"
            data={trendingLists}
            totalList={totalTrendingList}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
          />
          <SliderSection
            heading="Most Popular"
            data={popularLists}
            totalList={totalPopularLists}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
          />
        </>
      )}
    </>
  );
  // ) : (
  //   <LoaderWrap>
  //     <ValueLoader />
  //   </LoaderWrap>
  // );
};

export default DiscoverList;
