import React from "react";
import styled from "styled-components";
import NewInBuzzSectionSlider from "../ItemSectionSlider";

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
`;

const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.h1`
  padding: 0 0 10px 30px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  color: #fff;
  position: relative;
`;

const SliderSection = ({ heading }) => {
  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{heading}</MainHeading>
          <NewInBuzzSectionSlider />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  );
};

export default SliderSection;
