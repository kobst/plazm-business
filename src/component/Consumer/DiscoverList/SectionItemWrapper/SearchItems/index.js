import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import EventImg from "../../../../../images/eventimg.png";
import LockImage from "../../../../../images/lock.png";
import {ItemsWrapper, CoverImg, ItemsDescription, CollectionPara, Lock,} from '../../styled'


const SearchItems = () => {
  // const [offsetLeft, setOffsetLeft] = useState(0);
  // const [offsetTop, setOffsetTop] = useState(0);
  // const divRef = useRef();

  /** to set position on hover of text */
  // const displayData = () => {
  //   const { top, right } = divRef.current.getBoundingClientRect();
  //   setOffsetLeft(right - 300);
  //   setOffsetTop(top - 30);
  // };

  return (
    <>
      <ItemsWrapper className="SearchItemsWrapper">
        <CoverImg className="SearchCoverImg">
          <img src={EventImg} alt="" />
          <Lock>
            <img src={LockImage} alt="" />
          </Lock>
          <ItemsDescription>
            <CollectionPara>
              The 38 Essential Restaurants in New York City he 38 Essential
              Restaurants in New York City The 38 Essential Restaurants in New
              York City he 38 Essential Restaurants in New York CityThe 38
              Essential Restaurants in New York City he 38 Essential Restaurants
              in New York City
            </CollectionPara>

            
          </ItemsDescription>
        </CoverImg>
      </ItemsWrapper>
    </>
  );
};

SearchItems.propTypes = {
  article: PropTypes.object,
};

export default SearchItems;
