import React from "react";
import NewInBuzzSectionSlider from "../ItemSectionSlider";
import NewCollectionSectionGrid from "../ItemSectionSlider/grid";

import { FeatureWrapper, FeatureContainer, MainHeading } from "../styled";

const SliderSection = ({
  heading,
  data,
  totalList,
  setSelectedListId,
  setDiscoverBtn,
  setReadMore,
  offset,
  setOffSet,
  loader,
  setLoader,
  modal,
  setModal,
  selectedId,
  setSelectedId,
  setTotalLists,
  totalLists,
}) => {
  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{heading}</MainHeading>
          <NewCollectionSectionGrid
            data={data}
            totalList={totalList}
            heading={heading}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
            offset={offset}
            setOffSet={setOffSet}
            loader={loader}
            setLoader={setLoader}
            modal={modal}
            setModal={setModal}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            setTotalLists={setTotalLists}
            totalLists={totalLists}
          />


          {/* <NewInBuzzSectionSlider
            data={data}
            totalList={totalList}
            heading={heading}
            setSelectedListId={setSelectedListId}
            setDiscoverBtn={setDiscoverBtn}
            setReadMore={setReadMore}
            offset={offset}
            setOffSet={setOffSet}
            loader={loader}
            setLoader={setLoader}
            modal={modal}
            setModal={setModal}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            setTotalLists={setTotalLists}
            totalLists={totalLists}
          /> */}
        </FeatureContainer>
      </FeatureWrapper>
    </>
  );
};

export default SliderSection;
