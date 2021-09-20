import React from "react";
import { MdChevronLeft } from "react-icons/md";
import Input from "../../UI/Input/Input";
import SliderSection from "./SliderSection";
import {TopSectionWrap, LeftWrap, TotalNum, RightSearchWrap} from './styled.js'




const DiscoverList = ({ setDiscoverBtn }) => {
  return (
    <>
      <TopSectionWrap>
        <LeftWrap>
          <button className="BackButtonArrow" onClick={() => setDiscoverBtn(false)}>
            <MdChevronLeft />
          </button>
          <TotalNum>Total No. of Subscribed Lists  :  <span>12</span></TotalNum>
        </LeftWrap>
        <RightSearchWrap>
            <Input
              className="SearchSubscriptionsInput"
              placeholder="Search Lists"
            />
          </RightSearchWrap>  
      </TopSectionWrap>
      <SliderSection />
    </>
  );
};

export default DiscoverList;
