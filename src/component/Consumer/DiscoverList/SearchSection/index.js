import React from 'react'
import SectionItemWrapper from '../SectionItemWrapper'
import {FeatureWrapper, FeatureContainer, ListResultHeading} from '../styled'




const SearchSection = () => {

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <ListResultHeading>25 Search Results for <span>Burger</span></ListResultHeading>
          <SectionItemWrapper  />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default SearchSection
