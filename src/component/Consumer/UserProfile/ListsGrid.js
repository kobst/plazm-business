import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewInBuzzItems from "../DiscoverList/ItemSectionSlider/SliderItems";
import { Grid } from "@material-ui/core";
import {
  LoaderWrap,
  NoMorePost,
  GridWrapper,
} from "../DiscoverList/styled";
// import {
//   FetchMostPopularLists,
//   FetchTrendingLists,
//   fetchUserCreatedAndFollowedList,
// } from "../../../../reducers/listReducer";
import ValueLoader from "../../../utils/loader";

const ListsGrid = ({
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
  //selectedId,
  // setSelectedId,
  setTotalLists,
  totalLists,
  loadMore
}) => {
  const [displayModal, setDisplayModal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
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
        totalLists > offset
    ) {
      loadMore()
    }
    //   if (heading === "Trending" && trendingLists.length === offset + 12) {
    //     setLoader({ value: true, heading });
    //     setOffSet(offset + 12);
    //     dispatch(FetchTrendingLists(offset + 12));
    //   } else if (
    //     heading === "Most Popular" &&
    //     popularLists.length === offset + 12
    //   ) {
    //     setLoader({ value: true, heading });
    //     setOffSet(offset + 12);
    //     dispatch(FetchMostPopularLists(offset + 12));
    //   } else if (heading === "Subscribed Lists") {
    //     setLoader({ value: true, heading });
    //     setOffSet(offset + 12);
    //     const obj = {
    //       id: user._id,
    //       value: offset,
    //     };
    //     dispatch(fetchUserCreatedAndFollowedList(obj));
    //   } else if (heading === "My Lists") {
    //     setLoader({ value: true, heading });
    //     setOffSet(offset + 12);
    //   }
    // } else {
    //   setLoader({ value: false, heading });
    // }
  };

  /** on mouse wheel event */
  const onWheel = (evt) => {
    evt.preventDefault();
    divRef.current.scrollLeft += evt.deltaY;
  };
  return (
    <GridWrapper>
      <Grid ref={divRef}
        onScroll={(e) => fetchMoreLists(e)}
        onWheel={(e) => onWheel(e)} 
        direction="row" 
        container 
        spacing={2} 
        className="GridContainer"
      >
        {data.map((i, key) => (
          <Grid key={i._id} className="GridBox">
            <NewInBuzzItems
              data={i}
              heading={heading}
              setSelectedListId={setSelectedListId}
              setDiscoverBtn={() => null}
              setReadMore={() => null}
              modal={displayModal}
              setModal={setDisplayModal}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              setTotalLists={() => null}
              totalLists={totalLists}
            />
          </Grid>
        ))}
        {loader && (
          <LoaderWrap>
            <ValueLoader />
          </LoaderWrap>
        )}
        {!loader && totalLists <= data?.length && (
          <NoMorePost>No More Lists To Display</NoMorePost>
        )}
      </Grid>
    </GridWrapper>
  );
};
export default ListsGrid;