import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchItems from "./SearchItems";
import { SearchItemsContainer, NoMorePost } from "../styled";
import ValueLoader from "../../../../utils/loader";
import { SearchListApi } from "../../../../reducers/listReducer";
import NewInBuzzItems from "../ItemSectionSlider/SliderItems";

const SectionItemWrapper = ({
  heading,
  offset,
  setOffSet,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
  obj,
  loader,
  setLoader,
  modal,
  setModal,
  setSelectedId,
  selectedId,
  setTotalLists,
}) => {
  const listSearch = useSelector((state) => state.list.listSearch);
  const searchList = useSelector((state) => state.list.searchList);
  const totalLists = useSelector((state) => state.list.totalSearchList);
  const loading = useSelector((state) => state.list.loadingSearchList);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();


    /** to subscribe from a list */
    // const listSubscribe = async () => {
    //   setLoader(true);
    //   const obj = {
    //     userId: user._id,
    //     listId: data._id,
    //   };
    //   const list = await dispatch(SubscribeToAListAction(obj));
    //   const response = await unwrapResult(list);
    //   if (response) {
    //     setLoader(false);
    //     dispatch(addSubscribedList(response.listId));
    //     dispatch(
    //       userSubscribeToAList({
    //         type: heading,
    //         listId: response.listId,
    //         user: user,
    //       })
    //     );
    //     /** to update subscribe count */
    //     setTotalLists(totalLists + 1);
    //   }
    // };
  

  /** to fetch more lists */
  const fetchMoreList = () => {
    if (offset + 30 < totalLists) {
      setOffSet(offset + 30);
      dispatch(
        SearchListApi({ value: offset + 30, search: listSearch, ...obj })
      );
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
            offset < totalLists && loading ? (
              <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                {" "}
                <ValueLoader />
              </div>
            ) : null
          }
          scrollableTarget="scrollableDiv"
        >
          {searchList &&
            searchList.length > 0 &&
            searchList.map((i, key) => {
              return (
                // <SearchItems
                //   data={i}
                //   key={key}
                //   setSelectedListId={setSelectedListId}
                //   setDiscoverBtn={setDiscoverBtn}
                //   setReadMore={setReadMore}
                // />

              
                <NewInBuzzItems
                data={i}
                key={key}
                heading={heading}
                setSelectedListId={setSelectedListId}
                setDiscoverBtn={setDiscoverBtn}
                // displayModal={modal}
                // setDisplayModal={setModal}
                setReadMore={setReadMore}
                modal={modal}
                setModal={setModal}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
                setTotalLists={setTotalLists}
                totalLists={totalLists}
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
