import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchListApi } from "../../../../reducers/listReducer";
import ValueLoader from "../../../../utils/loader";
import SectionItemWrapper from "../SectionItemWrapper";
import { FeatureWrapper, FeatureContainer, ListResultHeading } from "../styled";

const SearchSection = ({
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
  offset,
  setOffSet,
  obj,
}) => {
  const listSearch = useSelector((state) => state.list.listSearch);
  const loading = useSelector((state) => state.list.loadingSearchList);
  const totalList = useSelector((state) => state.list.totalSearchList);
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();

  /** to search data based on input */
  useEffect(() => {
    const searchData = async () => {
      const data = await dispatch(
        SearchListApi({ value: 0, search: listSearch, ...obj })
      );
      const res = await unwrapResult(data);
      if (res) {
        setFlag(false);
      }
    };
    searchData();
  }, [listSearch, dispatch]);

  return (loading && offset === 0) || flag ? (
    <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
      <ValueLoader />
    </div>
  ) : (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <ListResultHeading>
            {totalList} Search Results for <span>{listSearch}</span>
          </ListResultHeading>
          <SectionItemWrapper
            offset={offset}
            setOffSet={setOffSet}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
            obj={obj}
          />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  );
};

export default SearchSection;
