import React from 'react';
import styled from 'styled-components';

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  border:0;
  img{
    max-height: 294px;
    width: 100%;
    height: 100%
  }
  @media (max-width:767px){ 
    width: 100%;
    height: 100%;
    max-height: 142px;
  }
`;

const SliderItems = ({image}) => (
  <>
    <ItemsWrapper>
      <img src={image} alt="Cover" />
    </ItemsWrapper>
  </>
);

export default SliderItems;
