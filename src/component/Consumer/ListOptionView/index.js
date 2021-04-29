import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoMdClose } from "react-icons/io";
import Input from "../../UI/Input/Input";
import Select from "../../Consumer/UI/Select";
import selectarrow from "../../../images/sortingselectarrow.png";
import SearchIcon from "../../../images/subscriptionSearchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCreatedAndFollowedList,
  clearListData,
} from "../../../reducers/listReducer";
import ValueLoader from "../../../utils/loader";
import DisplayListSection from "./DisplayListSection";

const ListOptionSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0px;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const HeadingWrap = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
`;

const TopHeadingWrap = styled.div`
  padding: 30px 30px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px dashed #fff;
  @media (max-width: 767px) {
    padding: 15px 15px 0;
  }
`;

const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const SortingSelect = styled.div`
  max-width: 200px;
  margin: 15px 0;
  select {
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    padding-left: 0;
    background: url(${selectarrow}) no-repeat right 10px center transparent;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const SearchWrap = styled.div`
  padding: 10px 30px 0;
  display: flex;
  @media (max-width: 767px) {
    padding: 10px 15px 0;
  }
  .SearchSubscriptionsInput {
    background: url(${SearchIcon}) no-repeat right 10px center #fff;
    border: 1px solid #e4e4e4;
    height: 38px;
    border-radius: 0;
    font-size: 14px;
    padding-right: 35px;
    ::placeholder {
      color: #c8c8c8;
    }
  }
`;

const ListingOptionWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
`;

const NoData = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: center;
`;

/*
 * @desc: to display all business lists
 */
const ListOptionView = ({
  setDisplayTab,
  setSelectedListId,
  selectedListId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector(
    (state) => state.list.loadingUserCreatedAndFollowed
  );
  const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffSet] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const list = filteredList.length > 0 ? filteredList : listData;

  useEffect(() => {
    if (offset === 0) {
      const obj = {
        id: user._id,
        value: offset,
      };
      dispatch(clearListData());
      dispatch(fetchUserCreatedAndFollowedList(obj));
    }
  }, [dispatch, user._id, offset]);

  /** lists search functionality implemented */
  useEffect(() => {
    setFilteredList(
      listData.filter(
        (entry) => entry.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    );
  }, [search, listData]);

  useEffect(() => {
    setOffSet(0);
    setHasMore(true);
  }, []);

  const fetchMoreList = () => {
    if (offset + 20 < totalList) {
      setOffSet(offset + 20);
      dispatch(
        fetchUserCreatedAndFollowedList({ id: user._id, value: offset + 20 })
      );
    } else setHasMore(false);
  };

  return loading && offset === 0 ? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : (
    <>
      <ListOptionSection>
        <HeadingWrap>
          <TopHeadingWrap>
            <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv>

            <SortingSelect>
              <Select>
                <option>All</option>
              </Select>
            </SortingSelect>
          </TopHeadingWrap>
          <SearchWrap>
            <Input
              className="SearchSubscriptionsInput"
              placeholder="Search Subscriptions"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>
        </HeadingWrap>
        <div
          id="scrollableDiv"
          style={{ height: "calc(100vh - 175px)", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={list ? list.length : 0}
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
            endMessage={
              list.length > 20 && !loading ? (
                <center>
                  <NoMorePost className="noMorePost">
                    No more List to show
                  </NoMorePost>
                </center>
              ) : null
            }
          >
            <ListingOptionWrap>
              {list.length > 0 ? (
                list.map((i, key) => (
                  <DisplayListSection
                    data={i}
                    key={key}
                    setSelectedListId={setSelectedListId}
                  />
                ))
              ) : (
                <NoData>No Lists To Display</NoData>
              )}
            </ListingOptionWrap>
          </InfiniteScroll>
        </div>
      </ListOptionSection>
    </>
  );
};

export default ListOptionView;
