import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import SliderItems from './SliderItems'
import {useSelector} from 'react-redux'

const SectionSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 294px;
  flex-direction: column;
  @media (max-width:767px){ 
    height: 142px;
  }
`

const SectionSlider = () => {
  const images = useSelector(state => state.business.images);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }
  return (
    <>
      <SectionSliderWrapper>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={false}
          keyBoardControl={false}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          autoPlay={false}
          autoPlaySpeed={2000}
        >
          {images.map((i,key)=><div key={key}>
            <SliderItems image={i}/>
          </div>)}
        </Carousel>
      </SectionSliderWrapper>
    </>
  )
}

export default SectionSlider
