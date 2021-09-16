import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Input from "../../UI/Input/Input";
import Select from "react-select";
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
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #fff;
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 15px 15px;
  }
`;

const SortingSelect = styled.div`
  max-width: 200px;
  margin: 15px 0;
  span.dropdown-count {
    margin: 0 0 0 8px;
  }
`;

const SearchWrap = styled.div`
  padding: 0;
  display: flex;
  background: #000;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
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
  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
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
  }
`;

const RightSearchWrap = styled.div`
  display: flex;
  max-width: 311px;
  width: 100%;
  @media (max-width: 767px) {
    max-width: 200px;
  }
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
  @media (max-width: 767px) {
    left: 0;
    right: inherit;
    width: 30px;
    height: 30px;
  }
`;

const DiscoverBtn = styled.button`
  padding: 9px 15px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  background: #18a7fc;
  border-radius: 2px;
  font-family: Montserrat;
  :hover,
  :focus {
    opacity: 0.6;
    outline: none;
    transition: 0.3s;
  }
`;

/*
 * @desc: to display all business lists
 */
const ListOptionView = ({
  setDisplayTab,
  setSelectedListId,
  setDiscoverBtn,
  selectedListId,
}) => {
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
  const [selectedList, setSelectedList] = useState(null);
  const list =
    filteredList.length > 0
      ? filteredList
      : filteredListData.length > 0 && search === ""
      ? filteredListData
      : search === ""
      ? listData
      : [];
  const userLists = listData.filter((i) => i.ownerId === user._id);

  const options = [
    {
      value: "All",
      label: (
        <>
          All
          <span
            className="dropdown-count"
            dangerouslySetInnerHTML={{ __html: totalList }}
          />
        </>
      ),
    },
    {
      value: "My Lists",
      label: (
        <>
          My Lists
          <span
            className="dropdown-count"
            dangerouslySetInnerHTML={{ __html: userLists.length }}
          />
        </>
      ),
    },
    {
      value: "Subscribed Lists",
      label: (
        <>
          Subscribed Lists
          <span
            className="dropdown-count"
            dangerouslySetInnerHTML={{ __html: totalList - userLists.length }}
          />
        </>
      ),
    },
  ];

  /** to filter data based on top filters */
  useEffect(() => {
    if (selectedFilter === "Subscribed Lists") {
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
    if (
      selectedFilter === "Subscribed Lists" ||
      selectedFilter === "My Lists"
    ) {
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
  const selectChange = (obj) => {
    setSelectedFilter(obj.value);
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
          <SortingSelect>
            <Select
              value={{
                value: selectedFilter,
                label: (
                  <>
                    {selectedFilter}
                    <span
                      className="dropdown-count"
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedFilter === "All"
                            ? "(" + totalList + ")"
                            : selectedFilter === "My Lists"
                            ? "(" + userLists.length + ")"
                            : "(" +
                              parseInt(totalList - userLists.length) +
                              ")",
                      }}
                    />
                  </>
                ),
              }}
              isSearchable={false}
              onChange={(val) => selectChange(val)}
              options={options}
              styles={{
                control: (provided) => ({
                  ...provided,
                  flexGrow: 1,
                  paddingLeft: "0",
                  height: "100%",
                  boxShadow: "none",
                  border: "1px solid #221E45",
                  backgroundColor: "#221E45",
                  color: "#fff",
                  width: "230px",
                  fontSize: "20px",
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  ":hover": {
                    border: "1px solid #221E45",
                  },
                  "@media only screen and (min-width: 320px) and (max-width: 768px)":
                    {
                      fontSize: "12px",
                    },
                }),
                container: (provided) => ({
                  ...provided,
                  height: "40px",
                }),
                indicatorsContainer: () => ({
                  color: "#fff",
                  "@media only screen and (min-width: 1025px) and (max-width: 1399px)":
                    {
                      padding: "0 5px",
                    },
                  svg: {
                    color: "#fff",
                  },
                  div: {
                    "@media only screen and (min-width: 1025px) and (max-width: 1399px)":
                      {
                        padding: "8px 0",
                      },
                  },
                }),
                placeholder: () => ({
                  color: "#1D264F",
                  fontSize: "20px",
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  "@media only screen and (min-width: 320px) and (max-width: 768px)":
                    {
                      fontSize: "12px",
                    },
                }),
                singleValue: () => ({
                  fontSize: "20px",
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  "@media only screen and (min-width: 320px) and (max-width: 768px)":
                    {
                      fontSize: "12px",
                    },
                }),
                valueContainer: () => ({
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Roboto",
                  "@media only screen and (min-width: 1025px) and (max-width: 1399px)":
                    {
                      padding: "2px 3px",
                    },
                }),
                IndicatorContainer: () => ({
                  "@media only screen and (min-width: 1025px) and (max-width: 1399px)":
                    {
                      padding: "8px 0",
                    },
                }),
                menu: (styles) => ({
                  ...styles,
                  backgroundColor: "#221E45",
                  border: "1px solid #221E45",
                  cursor: "pointer",
                  fontSize: "13px",
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: isSelected
                    ? "#FF2E9A"
                    : isFocused
                    ? "#FF2E9A"
                    : "#221E45",
                  ":active": {
                    ...styles[":active"],
                    backgroundColor: isSelected ? "#FF2E9A" : "#221E45",
                  },
                }),
              }}
            ></Select>
          </SortingSelect>
          <DiscoverBtn onClick={() => setDiscoverBtn(true)}>
            Discover More
          </DiscoverBtn>
        </HeadingWrap>
        <div
          id="scrollableDiv"
          style={{ height: "calc(100vh - 115px)", overflow: "auto" }}
        >
          <ListingOptionWrap>
            {list.length > 0 ? (
              list.map((i, key) => (
                <DisplayListSection
                  data={i}
                  key={key}
                  setSelectedListId={setSelectedListId}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
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
