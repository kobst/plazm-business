import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import NewInBuzzItems from "./SliderItems";
import { LoaderWrap, NewInBuzzSliderWrapper, NoMorePost } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchMostPopularLists,
  FetchTrendingLists,
} from "../../../../reducers/listReducer";
import ValueLoader from "../../../../utils/loader";
import useFetch from "../../../../utilities/infinite-scroll";

const NewCollectionSectionSlider = ({
  data,
  totalList,
  heading,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore
}) => {
  const [displayModal, setDisplayModal] = useState(null);
  const [offset, setOffSet] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const loadindTrending = useSelector(
    (state) => state.list.loadingTrendingLists
  );
  const loadingPopular = useSelector((state) => state.list.loadingPopularLists);
  const loader = useRef(null);

  const { loading, error } = useFetch(offset, heading);
  console.log(loading, error, offset);

  const handleObserver = useCallback((entries) => {
    console.log("**1")
    const target = entries[0];
    if (target.isIntersecting) {
      setOffSet((prev) => prev + 12);
    }
  }, []);

  useEffect(() => {
    console.log("**2")
    const option = {
      root: document.getElementById("divRoot"+heading),
      rootMargin: "0px",
      threshold: 0.25
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  // const fetchMoreLists = () => {
  //   console.log(heading, "fetch more called");
  //   if (offset + 12 < totalList) {
  //     setOffSet(offset + 12);
  //     if (heading === "Trending") {
  //       dispatch(FetchTrendingLists(offset));
  //     } else {
  //       dispatch(FetchMostPopularLists(offset));
  //     }
  //   } else setHasMore(false);
  // };
  return (
    <div>
      <NewInBuzzSliderWrapper id={"divRoot"+heading}>
        {/* {((!loadindTrending && heading === "Trending") ||
          (!loadingPopular && heading !== "Trending")) &&
        data.length > 0 ? (
          data.map((i, key) => (
            <NewInBuzzItems
              data={i}
              key={key}
              heading={heading}
              setSelectedListId={setSelectedListId}
              setDiscoverBtn={setDiscoverBtn}
            />
          ))
        ) : (loadindTrending && heading === "Trending") ||
          (loadingPopular && heading !== "Trending") ? (
          <LoaderWrap>
            <ValueLoader />
          </LoaderWrap>
        ) : (
          <center>
            <NoMorePost>No Lists to display</NoMorePost>
          </center>
        )} */}
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
          />
        ))}
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        <div ref={loader} />
      </NewInBuzzSliderWrapper>
    </div>
  );
};

NewCollectionSectionSlider.propTypes = {
  buzzArticles: PropTypes.array,
};

export default NewCollectionSectionSlider;
