import React from "react";
import NewInBuzzSectionSlider from "../ItemSectionSlider";
import { FeatureWrapper, FeatureContainer, MainHeading } from "../styled";

const SliderSection = ({
  heading,
  data,
  totalList,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore
}) => {
  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{heading}</MainHeading>
          <NewInBuzzSectionSlider
            data={data}
            totalList={totalList}
            heading={heading}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
          />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  );
};

export default SliderSection;
