import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Input from "../../UI/Input/Input";
// import Select from "../../Consumer/UI/Select";
import selectarrow from "../../../images/sortingselectarrow.png";
import SearchIcon from "../../../images/subscriptionSearchIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCreatedAndFollowedList,
  clearListData,
  filterSubscribedLists,
  filterUserCreatedLists,
  filterByAll,
} from "../../../reducers/listReducer";
import ValueLoader from "../../../utils/loader";
import DisplayListSection from "./DisplayListSection";
import Select from 'react-select';



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
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px dashed #fff;
`;

// const CloseDiv = styled.div`
//   width: 24px;
//   position: relative;
//   display: flex;
//   justify-content: flex-end;
//   position: absolute;
//   right: 17px;
//   cursor: pointer;
//   top: 17px;
//   svg {
//     font-size: 24px;
//     color: #fff;
//   }
// `;

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
  padding: 0;
  display: flex;
  background: #000;
  align-items: center;
  justify-content: space-between;
  .SearchSubscriptionsInput {
    background: url(${SearchIcon}) no-repeat right 10px center #fff;
    border: 1px solid #e4e4e4;
    height: 38px;
    border-radius: 0;
    font-size: 14px;
    padding-right: 35px;
    margin: 0;
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

const NoData = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: center;
`;

const Heading = styled.h1`
  color: #ff2e79;
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 0 20px;
  padding: 0;
  font-family: "Roboto", sans-serif;
  width: calc(100% - 350px);
  @media (max-width: 767px) {
    margin: 0 auto 10px;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
`;

const RightSearchWrap = styled.div`
  display: flex;
  max-width: 311px;
  width: 100%;
`;
const CloseDiv = styled.div`
  width: 38px;
  position: relative;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -40px;
  cursor: pointer;
  top: 0px;
  background: #fe02b9;
  box-shadow: 4px 0px 14px -5px #fe02b9;
  svg {
    font-size: 32px;
    color: #fff;
  }
  @media (max-width: 479px) {
    left: 0;
    right: inherit;
    width: 30px;
    height: 30px;
  }
`;

/*
 * @desc: to display all business lists
 */
const ListOptionView = ({
  setDisplayTab,
  setSelectedListId,
  selectedListId,
}) => {
  const options = [
    { value: 'All', label: 'All' },
    { value: 'My Lists', label: 'My Lists' },
    { value: 'Subscribed Lists', label: 'subscribed' },
  ];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector(
    (state) => state.list.loadingUserCreatedAndFollowed
  );
  const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);

  const filteredListData = useSelector((state) => state.list.filteredList);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const list =
    filteredList.length > 0
      ? filteredList
      : filteredListData.length > 0 && search === ""
      ? filteredListData
      : search === ""
      ? listData
      : [];
  const userLists = listData.filter((i) => i.ownerId === user._id);

  /** to filter data based on top filters */
  useEffect(() => {
    if (selectedFilter === "subscribed") {
      dispatch(filterSubscribedLists(user._id));
    } else if (selectedFilter === "My Lists") {
      dispatch(filterUserCreatedLists(user._id));
    } else dispatch(filterByAll());
  }, [selectedFilter, dispatch, user._id]);

  /** to fetch all the user created and subscribed lists */
  useEffect(() => {
    const obj = {
      id: user._id,
      value: 0,
    };
    dispatch(clearListData());
    dispatch(fetchUserCreatedAndFollowedList(obj));
  }, [dispatch, user._id]);

  /** lists search functionality implemented (to search based on title or description) */
  useEffect(() => {
    if (selectedFilter === "subscribed" || selectedFilter === "My Lists") {
      setFilteredList(
        filteredListData.filter(
          (entry) =>
            entry.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            entry.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      );
    } else {
      setFilteredList(
        listData.filter(
          (entry) =>
            entry.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            entry.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      );
    }
  }, [search, listData, filteredListData, selectedFilter]);

  /** on top filter change */
  const selectChange = (e) => {
    setSelectedFilter(e.target.value);
    setSearch("");
  };

  return loading ? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : (
    <>
      <ListOptionSection>
      <SearchWrap>
        <Heading>Lists</Heading>
        <RightSearchWrap>
        <Input
              value={search}
              className="SearchSubscriptionsInput"
              placeholder="Search Lists"
              onChange={(e) => setSearch(e.target.value)}
            />
        </RightSearchWrap>
        <CloseDiv>
          <IoMdClose onClick={() => setDisplayTab(false)} />
        </CloseDiv>
      </SearchWrap>
        <HeadingWrap>
          <TopHeadingWrap>
            {/* <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv> */}

            <SortingSelect>
              {/* <Select value={selectedFilter} onChange={(e) => selectChange(e)}>
                <option value="All">All ({totalList})</option>
                <option value="My Lists">My Lists ({userLists.length})</option>
                <option value="subscribed">
                  Subscribed Lists ({totalList - userLists.length})
                </option>
              </Select> */}
              <Select
                value={selectedFilter}
                onChange={(e) => selectChange(e)}
                options = {options}
                >
                  {/* <option value="All">All ({totalList})</option>
                  <option value="My Lists">My Lists ({userLists.length})</option>
                  <option value="subscribed">
                    Subscribed Lists ({totalList - userLists.length})
                  </option> */}
              </Select>
            </SortingSelect>
          </TopHeadingWrap>
          {/* <SearchWrap>
            <Input
              value={search}
              className="SearchSubscriptionsInput"
              placeholder="Search Subscriptions"
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap> */}
        </HeadingWrap>
        <div
          id="scrollableDiv"
          style={{ height: "calc(100vh - 175px)", overflow: "auto" }}
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
        </div>
      </ListOptionSection>
    </>
  );
};

export default ListOptionView;
