import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchItems from "./SearchItems";
import { SearchItemsContainer, NoMorePost } from "../styled";
import ValueLoader from "../../../../utils/loader";
import { SearchListApi } from "../../../../reducers/listReducer";

const SectionItemWrapper = ({
  offset,
  setOffSet,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
}) => {
  const listSearch = useSelector((state) => state.list.listSearch);
  const searchList = useSelector((state) => state.list.searchList);
  const totalList = useSelector((state) => state.list.totalSearchList);
  const loading = useSelector((state) => state.list.loadingSearchList);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  /** to fetch more lists */
  const fetchMoreList = () => {
    if (offset + 30 < totalList) {
      setOffSet(offset + 30);
      dispatch(SearchListApi({ value: offset + 30, search: listSearch }));
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <SearchItemsContainer id="scrollableDiv">
        <InfiniteScroll
          dataLength={searchList ? searchList.length : 0}
          next={fetchMoreList}
          hasMore={hasMore}
          loader={
            offset < totalList && loading ? (
              <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                {" "}
                <ValueLoader height="40" width="40" />
              </div>
            ) : null
          }
          scrollableTarget="scrollableDiv"
        >
          {searchList &&
            searchList.length > 0 &&
            searchList.map((i, key) => {
              return (
                <SearchItems
                  data={i}
                  key={key}
                  setSelectedListId={setSelectedListId}
                  setDiscoverBtn={setDiscoverBtn}
                  setReadMore={setReadMore}
                />
              );
            })}
          {!hasMore && searchList.length > 30 && !loading ? (
            <NoMorePost className="noMorePost">No more List to show</NoMorePost>
          ) : null}
        </InfiniteScroll>
      </SearchItemsContainer>
    </>
  );
};

export default SectionItemWrapper;
