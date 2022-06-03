import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  filterData,
  setFilters,
  setSideFiltersByMostLiked,
  setSideFiltersByMostRecent,
} from "../../../../../../reducers/businessReducer";

const PostFilterButtonContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 18px 12px 12px;
  background: #120f24;
  flex-direction: row;
  justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 479px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const RoundButtonsWrap = styled.div`
  display: flex;
`;

const RoundButton = styled.button`
  display: flex;
  background: #292454;
  border-radius: 39px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #ffffff;
  margin: 0 5px 0 0;
  cursor: pointer;
  border: 0;
  min-width: 67px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  :hover,
  :focus {
    background: #ff2e9a;
  }
  &.selected {
    background: #ff2e9a;
  }
`;

const BorderButtonsWrap = styled.div`
  display: flex;
`;

const BorderButtons = styled.button`
  display: flex;
  background: transparent;
  border-radius: 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #ffffff;
  margin: 0 0 0 5px;
  cursor: pointer;
  border: 0;
  min-width: 84px;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  position: relative;
  :hover,
  :focus {
    color: #00e0ff;
    &:before {
      width: 100%;
      height: 2px;
      background: #00e0ff;
      content: "";
      position: absolute;
      bottom: -12px;
    }
  }
  &.selected {
    color: #00e0ff;
    &:before {
      width: 100%;
      height: 2px;
      background: #00e0ff;
      content: "";
      position: absolute;
      bottom: -12px;
    }
  }
  @media (max-width: 479px) {
    margin: 10px 0 0 0;
  }
`;

const PostFilterButton = ({ setFilterArr }) => {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [sideFilterFlag, setSideFilterFlag] = useState(false);
  const business = useSelector((state) => state.business.business);
  const user = useSelector((state) => state.user.user);
  const filters = useSelector((state) => state.business.filters);
  const filterByLiked = useSelector(
    (state) => state.business.filterByMostLiked
  );
  const loadingFilterData = useSelector(
    (state) => state.business.loadingFilterData
  );

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

  /** to call an api on change of side filters */
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

  /*
   * @desc: filter by posts by me
   */
  const FilterByPostsByMe = () => {
    dispatch(
      setFilters({
        Business: false,
        PostsByMe: true,
        MySubscriptions: false,
        Others: false,
      })
    );
    setFlag(!flag);
    setFilterArr([]);
  };

  /*
   * @desc: filter by others
   */
  const FilterByPostsByOthers = () => {
    dispatch(
      setFilters({
        Business: false,
        PostsByMe: false,
        MySubscriptions: false,
        Others: true,
      })
    );
    setFlag(!flag);
    setFilterArr([]);
  };

  /*
   * @desc: to filter data by most liked
   */
  const setMostLiked = () => {
    setSideFilterFlag(!sideFilterFlag);
    dispatch(setSideFiltersByMostLiked());
  };

  /*
   * @desc: to filter data by most recent
   */
  const setMostRecent = () => {
    setSideFilterFlag(!sideFilterFlag);
    dispatch(setSideFiltersByMostRecent());
  };

  return (
    <>
      <PostFilterButtonContent>
        <RoundButtonsWrap>
          <RoundButton
            onClick={() => FilterByPostsByMe()}
            disabled={filters["PostsByMe"] || loadingFilterData}
            className={filters["PostsByMe"] ? "selected" : ""}
          >
            For Me
          </RoundButton>
          <RoundButton
            onClick={() => FilterByPostsByOthers()}
            disabled={filters["Others"] || loadingFilterData}
            className={filters["Others"] ? "selected" : ""}
          >
            Others
          </RoundButton>
        </RoundButtonsWrap>

        <BorderButtonsWrap>
          <BorderButtons
            onClick={() => setMostLiked()}
            disabled={filterByLiked}
            className={filterByLiked ? "selected" : ""}
          >
            Most Liked
          </BorderButtons>
          <BorderButtons
            onClick={() => setMostRecent()}
            disabled={!filterByLiked}
            className={!filterByLiked ? "selected" : ""}
          >
            Newest
          </BorderButtons>
        </BorderButtonsWrap>
      </PostFilterButtonContent>
    </>
  );
};

export default PostFilterButton;
