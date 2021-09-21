import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import EventImg from "../../../../../images/eventimg.png";
import LockImage from "../../../../../images/lock.png";

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  text-align: center;
  min-height: 100%;
  width: 250px;
`;
const CoverImg = styled.div`
  margin: 0px;
  height: 200px;
  display: flex;
  align-items: flex-start;
  /* overflow: hidden; */
  width: 100%;
  padding: 0;
  justify-content: center;
  width: 250px;
  &:hover {
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

const ItemsDescription = styled.div`
  padding: 15px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(360deg, #000000 0%, rgba(7, 3, 46, 0) 91.23%);
  :hover {
    .test2 {
      visibility: visible;
    }
  }
`;

const CollectionPara = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  text-align: left;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
`;

const Lock = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const DisplayItemContent = styled.div`
  position: fixed;
  left: ${(props) => props.offsetLeft || 0}px;
  top: ${(props) => props.offsetTop || 0}px;
  cursor: pointer;
  height: 500px;
  background: #fff;
  width: 250px;
  z-index: 1000;
  &.test2 {
    visibility: hidden;
  }
  color: red;
`;

const NewInBuzzItems = () => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const divRef = useRef();

  /** to set position on hover of text */
  const displayData = () => {
    const { top, right } = divRef.current.getBoundingClientRect();
    setOffsetLeft(right - 250);
    setOffsetTop(top);
  };

  return (
    <>
      <ItemsWrapper ref={divRef}>
        <CoverImg>
          <img src={EventImg} alt="" />
          <Lock>
            <img src={LockImage} alt="" />
          </Lock>
          <ItemsDescription onMouseOver={() => displayData()}>
            <CollectionPara>
              The 38 Essential Restaurants in New York City he 38 Essential
              Restaurants in New York City The 38 Essential Restaurants in New
              York City he 38 Essential Restaurants in New York CityThe 38
              Essential Restaurants in New York City he 38 Essential Restaurants
              in New York City
            </CollectionPara>

            <DisplayItemContent
              className="test2"
              offsetLeft={offsetLeft}
              offsetTop={offsetTop}
            >
              <button onClick={()=> console.log("test")}>Check</button>
            </DisplayItemContent>
          </ItemsDescription>
        </CoverImg>
      </ItemsWrapper>
    </>
  );
};

NewInBuzzItems.propTypes = {
  article: PropTypes.object,
};

export default NewInBuzzItems;
