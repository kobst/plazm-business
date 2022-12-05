import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../../images/search-icon.png";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayBar } from "../../../../reducers/globalSearchReducer";
import error from "../../../../constants";
import { setSearchData } from "../../../../reducers/myFeedReducer";
import useStore from "../../useState";
import {
  HomeSearch,
  SearchFeedList,
  clearSearchFeed,
  setSideFiltersHomeSearch,
  setEnterClicked,
} from "../../../../reducers/myFeedReducer";
import { checkBusiness } from "../../../../reducers/businessReducer";
import { useLocation } from "react-router-dom";
import GooglePlacesSearch from "../../../../utils/googlePlacesSearch";

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
  margin-bottom: 15px;
  margin-left: 0;
  width: 100%;
  text-align: center;
`;

const GlobalSearchInputWrap = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  height: 40px;
  margin: 10px 10px 15px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 101;
  align-items: center;
  input {
    width: calc(100% - 38px);
    height: 40px;
    background: #ffffff;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    z-index: 101;
  }
  button {
    width: 38px;
    height: 40px;
    background: #ffffff;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 101;
  }
`;

const GlobalSearchBox = ({ setOffset, type }) => {
  const dispatch = useDispatch();

  const history = useLocation()
    .pathname.split("/")
    .filter((item) => item);
  const autoCompleteRef = useRef(null);

  const [search, setSearch] = useState("");
  const loader = useSelector((state) => state.myFeed.loading);
  const [searchError, setSearchError] = useState("");
  // const [uploadMenu, setUploadMenu] = useState(false);
  const searchData = useSelector((state) => state.myFeed.searchData);
  const searchFeedList = useSelector((state) => state.myFeed.searchFeedList);
  const isNoDataFound = useSelector((state) => state.myFeed.isNoDataFound);
  const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
  const filters = useSelector((state) => state.business.filters);
  const user = useSelector((state) => state.user.user);
  const sideFilterForLikes = useSelector(
    (state) => state.business.filterByMostLiked
  );
  const updatedAtFilter = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const draggedLocation = useStore((state) => state.draggedLocation);
  useEffect(() => {
    return () => {
      dispatch(setSearchData(""));
      dispatch(setDisplayBar(false));
      setSearch("");
    };
  }, []);
  useEffect(() => {
    setSearch(searchData);
  }, [searchData]);

  /** on key press handler for search */
  const searchList = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchFn();
    }
  };
  /** on key press handler for search */
  const searchFn = (search) => {
    if (search !== "" && search.length >= 4 && !search.trim() === false) {
      setOffset(0);
      setSearchError("");
      dispatch(setSearchData(search));
      switch (type) {
        case "Explore":
          // dispatch(setSideFiltersHomeSearch());
          const obj = {
            search: search,
            value: 0,
            filters: { closest: filterClosest, updated: updatedAtFilter },
            latitude: draggedLocation.lat,
            longitude: draggedLocation.lng,
          };
          // dispatch(setEnterClicked(true));
          dispatch(SearchFeedList(obj));
          // dispatch(HomeSearch(obj));
          break;
        case "Business Search":
          dispatch(
            checkBusiness({
              businessId: history.at(-1),
              filters: {
                PostsByMe: filters.PostsByMe
                  ? filters.PostsByMe
                  : !filters.Business &&
                    !filters.PostsByMe &&
                    !filters.MySubscriptions &&
                    !filters.Others
                  ? true
                  : false,
                Business: false,
                MySubscriptions: filters.MySubscriptions
                  ? filters.MySubscriptions
                  : false,
                Others: filters.Others ? filters.Others : false,
              },
              value: 0,
              ownerId: user ? user._id : null,
              sideFilters: { likes: sideFilterForLikes },
              search: search,
            })
          );
          break;
      }
    } else if (search.length >= 0 && search.length < 4) {
      setSearchError(error.SEARCH_ERROR);
    }
    autoCompleteRef.current.focus();
  };

  /** on change handler for search */
  const onChangeSearch = (e) => {
    setSearchError("");
    setSearch(e.target.value);
    dispatch(setSearchData(e.target.value));
    if (search.length >= 4) {
      searchFn(e.target.value);
    }
  };

  return (
    <>
      <GlobalSearchInputWrap>
        <GooglePlacesSearch
          autoCompleteRef={autoCompleteRef}
          isNoDataFound={isNoDataFound}
          query={search}
          onChange={onChangeSearch}
          disabled={loader}
          placeholder={type}
        />
        <button>
          <img src={SearchIcon} onClick={() => searchFn()} />
        </button>
      </GlobalSearchInputWrap>
      {searchError !== "" ? <ErrorDiv>{searchError}</ErrorDiv> : null}
    </>
  );
};

export default GlobalSearchBox;
