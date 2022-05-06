import React, { useEffect, useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import error from "../../../../constants";
import {
  setSearchData,
  setSideFiltersByClosest,
  setSideFiltersByUpdatedAt,
} from "../../../../reducers/myFeedReducer";
import DropdwonArrowTop from "../../../../images/top_arrow_polygon.png";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchWrap = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  background: #000000;
  input {
    border: 0;
    outline: 0;
    padding: 0 10px;
    width: 311px;
    height: 40px;
    font-size: 14px;
    font-weight: normal;
    box-shadow: none;
    background: #fff;
    color: #000;
    font-family: "Roboto", sans-serif;
    ::placeholder {
      color: #bdbdbd;
    }
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }
`;

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
  margin-bottom: 10px;
  margin-left: 20px;
  padding: 10px 0 0 172px;
  @media (max-width: 767px) {
    padding: 10px 0 0 0px;
  }
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

const FilterBox = styled.div`
  margin: 0px;
  padding: 0;
  font-family: "Roboto", sans-serif;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 14px;
  }
`;

const RightSearchWrap = styled.div`
  display: flex;
  @media (max-width: 767px) {
    width: 90%;
  }
`;
const CloseDiv = styled.div`
  width: 40px;
  position: relative;
  height: 40px;
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

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 130px;
  overflow: auto;
  background: #fe02b9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 39px;
  overflow: visible;
  right: 20px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 13px;
    height: 12px;
    content: " ";
    top: -11px;
    position: absolute;
    margin: 0 auto;
    display: flex;
    text-align: center;
    right: -1px;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  @media (max-width: 767px) {
    top: 81px;
    right: -10px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 2px 5px;
    text-decoration: none;
    font-size: 12px;
    font-family: Montserrat;
    font-weight: 600;
    button {
      font-size: 12px;
      color: #fff;
      font-family: Montserrat;
      font-weight: 600;
      border: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      background: transparent;
      :hover,
      :focus {
        color: #fff;
      }
    }
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
  }
`;

const SearchBar = ({ setOffset, setDisplayTab, setFlag }) => {
  const menuRef = useRef(null);
  const [search, setSearch] = useState("");
  const loader = useSelector((state) => state.myFeed.loading);
  const [searchError, setSearchError] = useState("");
  const [uploadMenu, setUploadMenu] = useState(false);
  const searchData = useSelector((state) => state.myFeed.searchData);
  const filterByClosest = useSelector((state) => state.myFeed.filterByClosest);
  const filterByUpdatedAt = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch(searchData);
  }, [searchData]);

  /** to toggle side filter menu */
  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu);
  };

  /** to set side filter by closest */
  const closestFilter = () => {
    setOffset(0);
    setFlag(true);
    dispatch(setSideFiltersByClosest());
    setUploadMenu(false);
  };

  /** to set side filter by recently updated */
  const recentlyUpdatedFilter = () => {
    setOffset(0);
    setFlag(true);
    dispatch(setSideFiltersByUpdatedAt());
    setUploadMenu(false);
  };

  /** on key press handler for search */
  const searchList = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (search !== "" && search.length >= 4 && !search.trim() === false) {
        setOffset(0);
        setSearchError("");
        dispatch(setSearchData(search));
      } else if (search.length >= 0 && search.length < 4) {
        setSearchError(error.SEARCH_ERROR);
      }
    }
  };

  /** on change handler for search */
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <SearchWrap>
        <Heading>My Feed</Heading>
        <RightSearchWrap>
          <Input
            value={search}
            onKeyPress={(event) => searchList(event)}
            onChange={(e) => onChangeSearch(e)}
            disabled={loader}
            placeholder="Search Feed"
          />
          <FilterBox ref={menuRef}>
            <FaFilter onClick={toggleUploadMenu} />
            {uploadMenu && (
              <DropdownContent>
                <ul>
                  <li>
                    {" "}
                    <button
                      onClick={() => closestFilter()}
                      disabled={filterByClosest}
                    >
                      Closest
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => recentlyUpdatedFilter()}
                      disabled={filterByUpdatedAt}
                    >
                      {" "}
                      Recently Updated
                    </button>
                  </li>
                </ul>
              </DropdownContent>
            )}
          </FilterBox>
        </RightSearchWrap>
        <CloseDiv>
          <IoMdClose onClick={() => setDisplayTab()} />
        </CloseDiv>
      </SearchWrap>
      {searchError !== "" ? <ErrorDiv>{searchError}</ErrorDiv> : null}
    </>
  );
};

export default SearchBar;
