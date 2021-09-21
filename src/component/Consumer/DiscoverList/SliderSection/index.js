import React from 'react'
import NewInBuzzSectionSlider from '../ItemSectionSlider'
import {FeatureWrapper, FeatureContainer, MainHeading} from '../styled'




const SliderSection = () => {

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>Trending</MainHeading>
          <NewInBuzzSectionSlider  />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default SliderSection
