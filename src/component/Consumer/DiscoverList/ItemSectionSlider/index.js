import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewInBuzzItems from "./SliderItems";
import { LoaderWrap, NewInBuzzSliderWrapper, NoMorePost } from "../styled";
import {
  FetchMostPopularLists,
  FetchTrendingLists,
} from "../../../../reducers/listReducer";
import ValueLoader from "../../../../utils/loader";

const NewCollectionSectionSlider = ({
  data,
  totalList,
  heading,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
  offset,
  setOffSet,
  loader,
  setLoader,
  modal,
  setModal,
  selectedId,
  setSelectedId,
  setTotalLists,
  totalLists,
}) => {
  const [displayModal, setDisplayModal] = useState(null);
  const dispatch = useDispatch();
  const trendingLists = useSelector((state) => state.list.trendingLists);
  const popularLists = useSelector((state) => state.list.popularLists);
  const divRef = useRef(null);

  /** fetch more data when scrollbar reaches end */
  const fetchMoreLists = (event) => {
    if (
      event.target.scrollLeft + event.target.offsetWidth ===
        event.target.scrollWidth &&
      offset <= totalList
    ) {
      if (heading === "Trending" && trendingLists.length === offset + 12) {
        setLoader(true);
        setOffSet(offset + 12);
        dispatch(FetchTrendingLists(offset + 12));
      } else if (
        heading !== "Trending" &&
        popularLists.length === offset + 12
      ) {
        setLoader(true);
        setOffSet(offset + 12);
        dispatch(FetchMostPopularLists(offset + 12));
      }
    } else {
      setLoader(false);
    }
  };

  /** on mouse wheel event */
  const onWheel = (evt) => {
    evt.preventDefault();
    divRef.current.scrollLeft += evt.deltaY;
  };
  return (
    <div>
      <NewInBuzzSliderWrapper
        onScroll={(e) => fetchMoreLists(e)}
        onWheel={(e) => onWheel(e)}
        id={heading}
        ref={divRef}
      >
        {data.map((i, key) => (
          <NewInBuzzItems
            data={i}
            key={key}
            heading={heading}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            setReadMore={setReadMore}
            modal={modal}
            setModal={setModal}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            setTotalLists={setTotalLists}
            totalLists={totalLists}
          />
        ))}
        {loader && (
          <LoaderWrap>
            <ValueLoader />
          </LoaderWrap>
        )}
        {!loader && <NoMorePost>No More Lists To Display</NoMorePost>}
      </NewInBuzzSliderWrapper>
    </div>
  );
};
export default NewCollectionSectionSlider;
