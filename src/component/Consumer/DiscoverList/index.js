import React, { useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMostPopularLists,
  FetchTrendingLists,
} from "../../../reducers/listReducer";
import ValueLoader from "../../../utils/loader";
import Input from "../../UI/Input/Input";
import SliderSection from "./SliderSection";
import {
  TopSectionWrap,
  LeftWrap,
  TotalNum,
  RightSearchWrap,
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     /** to fetch most trending list data */
  //     dispatch(FetchTrendingLists(0));
  //     /** to fetch most popular list data */
  //     dispatch(FetchMostPopularLists(0));
  //   };
  //   fetchData();
  // }, []);
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
            Total No. of Subscribed Lists :{" "}
            <span>{parseInt(totalList - userLists.length)}</span>
          </TotalNum>
        </LeftWrap>
        <RightSearchWrap>
          <Input
            className="SearchSubscriptionsInput"
            placeholder="Search Lists"
          />
        </RightSearchWrap>
      </TopSectionWrap>
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
  );
  // ) : (
  //   <LoaderWrap>
  //     <ValueLoader />
  //   </LoaderWrap>
  // );
};

export default DiscoverList;
