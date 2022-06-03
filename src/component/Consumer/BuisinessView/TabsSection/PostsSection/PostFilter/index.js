import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "../../../../UI/Checkbox/checkbox";
import DropdwonArrowTop from "../../../../../../images/top_arrow.png";
import { FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  filterData,
  setFilters,
  setSideFiltersByMostLiked,
  setSideFiltersByMostRecent,
} from "../../../../../../reducers/businessReducer";

const PostFilterContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px;
  background: #221e45;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #ff2e9a;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const CheckboxWrap = styled.div`
  display: flex;
  padding: 0;
  flex-direction: row;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  .container .checkmark:after {
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 1px 1px 0;
  }
  .container input:checked ~ .checkmark {
    background-color: transparent;
  }
  @media (max-width: 767px) {
    margin: 0 0 5px;
  }
  svg {
    cursor: pointer;
  }
`;
const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 102px;
  overflow: auto;
  background: #fe02b9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 25px;
  width: 30px;
  overflow: visible;
  right: -5px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: " ";
    top: -12px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 78px;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  @media (max-width: 767px) {
    top: 31px;
    right: 0;
    left: -5px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 0px 5px;
    text-decoration: none;
    font-size: 12px;
    font-family: "Montserrat";
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
  }
`;

const PostFilter = ({ setFilterArr }) => {
  const [uploadMenu, setUploadMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business.business);
  const user = useSelector((state) => state.user.user);
  const filters = useSelector((state) => state.business.filters);
  const filterByLiked = useSelector(
    (state) => state.business.filterByMostLiked
  );
  const [flag, setFlag] = useState(false);
  const loadingFilterData = useSelector(
    (state) => state.business.loadingFilterData
  );
  const [sideFilterFlag, setSideFilterFlag] = useState(false);
  /** useEffect to check if no checkbox is selected then by default check Business checkbox */
  useEffect(() => {
    if (flag === true) {
      dispatch(
        filterData({
          businessId: business && business[0] ? business[0]._id : "",
          filters: filters,
          value: 0,
          ownerId: user._id,
        })
      );
      setFlag(false);
    }
  }, [flag, dispatch, business, filters, user._id]);

  useEffect(() => {
    if (sideFilterFlag === true) {
      dispatch(
        filterData({
          businessId: business && business[0] ? business[0]._id : "",
          filters: filters,
          value: 0,
          ownerId: user._id,
          sideFilters: { likes: filterByLiked },
        })
      );
      setSideFilterFlag(false);
    }
  }, [sideFilterFlag, business, dispatch, filterByLiked, filters, user._id]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUploadMenu(false);
    }
  };

  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu);
  };

  /*
   * @desc: handle change function to be called on checkbox change
   */
  const handleChange = (e, text) => {
    dispatch(
      setFilters({
        ...filters,
        [text]: e.target.checked,
      })
    );
    setFlag(!flag);
    setFilterArr([]);
  };

  const setMostLiked = () => {
    setSideFilterFlag(!sideFilterFlag);
    dispatch(setSideFiltersByMostLiked());
    setUploadMenu(false);
  };

  const setMostRecent = () => {
    setSideFilterFlag(!sideFilterFlag);
    dispatch(setSideFiltersByMostRecent());
    setUploadMenu(false);
  };
  return (
    <>
      <PostFilterContent>
        <CheckboxWrap>
          <Checkbox
            checked={filters["Business"]}
            onChange={(e) => handleChange(e, "Business")}
            name="filter"
            disabled={loadingFilterData}
          />
          Business
        </CheckboxWrap>
        <CheckboxWrap>
          <Checkbox
            onChange={(e) => handleChange(e, "PostsByMe")}
            name="filter"
            checked={filters["PostsByMe"]}
            disabled={loadingFilterData}
          />
          Posts By Me
        </CheckboxWrap>
        <CheckboxWrap>
          <Checkbox
            onChange={(e) => handleChange(e, "MySubscriptions")}
            name="filter"
            checked={filters["MySubscriptions"]}
            disabled={loadingFilterData}
          />
          My Subscriptions
        </CheckboxWrap>
        <CheckboxWrap>
          <Checkbox
            onChange={(e) => handleChange(e, "Others")}
            checked={filters["Others"]}
            name="filter"
            disabled={loadingFilterData}
          />
          Others
        </CheckboxWrap>
        <CheckboxWrap ref={menuRef}>
          <FaSort onClick={toggleUploadMenu} />
          {uploadMenu && (
            <DropdownContent>
              <ul>
                <li onClick={() => setMostLiked()}>Most Liked</li>

                <li onClick={() => setMostRecent()}>Most recent</li>
              </ul>
            </DropdownContent>
          )}
        </CheckboxWrap>
      </PostFilterContent>
    </>
  );
};

export default PostFilter;
