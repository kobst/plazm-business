import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMostPopularLists,
  FetchTrendingLists,
} from "../../../reducers/listReducer";
import Input from "../../UI/Input/Input";
import SliderSection from "./SliderSection";
import {
  TopSectionWrap,
  LeftWrap,
  TotalNum,
  RightSearchWrap,
} from "./styled.js";

const DiscoverList = ({ setDiscoverBtn }) => {
  const dispatch = useDispatch();
  const loadindTrending = useSelector(
    (state) => state.list.loadingTrendingLists
  );
  const loadingPopular = useSelector((state) => state.list.loadingPopularLists);
  useEffect(() => {
    const fetchData = async () => {
      /** to fetch most trending list data */
      dispatch(FetchTrendingLists(0));
      /** to fetch most popular list data */
      dispatch(FetchMostPopularLists(0));
    };
    fetchData();
  }, []);
  return (
    <>
      <TopSectionWrap>
        <LeftWrap>
          <button
            className="BackButtonArrow"
            onClick={() => setDiscoverBtn(false)}
          >
            <MdChevronLeft />
          </button>
          <TotalNum>
            Total No. of Subscribed Lists : <span>12</span>
          </TotalNum>
        </LeftWrap>
        <RightSearchWrap>
          <Input
            className="SearchSubscriptionsInput"
            placeholder="Search Lists"
          />
        </RightSearchWrap>
      </TopSectionWrap>
      <SliderSection heading="Trending" />
      <SliderSection heading="Most Popular" />
    </>
  );
};

export default DiscoverList;
