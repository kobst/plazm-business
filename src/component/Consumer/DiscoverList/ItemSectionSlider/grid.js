import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewInBuzzItems from "./SliderItems";
import { Grid } from '@material-ui/core';
import { LoaderWrap, NewInBuzzSliderWrapper, NoMorePost } from "../styled";
import {
  FetchMostPopularLists,
  FetchTrendingLists,
  fetchUserCreatedAndFollowedList,
} from "../../../../reducers/listReducer";
import ValueLoader from "../../../../utils/loader";

const NewCollectionSectionGrid = ({
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
  const user = useSelector((state) => state.user.user);
  const divRef = useRef(null);

  /** fetch more data when scrollbar reaches end */
  const fetchMoreLists = (event) => {
    if (
      event.target.scrollLeft + event.target.offsetWidth ===
        event.target.scrollWidth &&
      offset <= totalList
    ) {
      if (heading === "Trending" && trendingLists.length === offset + 12) {
        setLoader({ value: true, heading });
        setOffSet(offset + 12);
        dispatch(FetchTrendingLists(offset + 12));
      } else if (
        heading === "Most Popular" &&
        popularLists.length === offset + 12
      ) {
        setLoader({ value: true, heading });
        setOffSet(offset + 12);
        dispatch(FetchMostPopularLists(offset + 12));
      } else if (heading === "Subscribed Lists") {
        setLoader({ value: true, heading });
        setOffSet(offset + 12);
        const obj = {
          id: user._id,
          value: offset,
        };
        dispatch(fetchUserCreatedAndFollowedList(obj));
      } else if (heading === "My Lists") {
        setLoader({ value: true, heading });
        setOffSet(offset + 12);
      }
    } else {
      setLoader({ value: false, heading });
    }
  };

  /** on mouse wheel event */
  const onWheel = (evt) => {
    evt.preventDefault();
    divRef.current.scrollLeft += evt.deltaY;
  };
  return (
    <div style={{overflowY: 'scroll', height: '750px'}}>
    <Grid direction="rows" container spacing={2}> 
        {data.map((i, key) => (
            <Grid item xs={12} sm={4}>
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
           </Grid>
        ))}
        {loader && (
          <LoaderWrap>
            <ValueLoader />
          </LoaderWrap>
        )}
        {loader && !loader.value && loader.heading === heading && (
          <NoMorePost>No More Lists To Display</NoMorePost>
        )}
    </Grid>
      <div style={{height: '350px'}} />
    </div>
  );
};
export default NewCollectionSectionGrid;
