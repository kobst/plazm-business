import React, {useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewInBuzzItems from './SliderItems'

const NewInBuzzSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  .react-multiple-carousel__arrow {
    display: none;
  }
  .react-multi-carousel-item {
    display: flex;
    @media (max-width: 991px) {
      justify-content: center;
    }
  }
`

const DisplayItemContent = styled.div`
  position: absolute;
  cursor: pointer;
  height: 500px;
  background: #fff;
  width: 300px;
`

const NewCollectionSectionSlider = ({  }) => {
  
  const [displayModal,setdisplayModal] = useState (false)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 3,
      slidesToSlide: 1,
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 3,
      slidesToSlide: 1,
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 1,
      slidesToSlide: 1,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }
  return (
    <>
      <NewInBuzzSliderWrapper>
        
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={true}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={true}
            autoPlaySpeed={2000}
            centerMode= {true}
          >
            
   
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
                <NewInBuzzItems displayModal = {displayModal} setdisplayModal = {setdisplayModal} />
     

          </Carousel>

          {displayModal && 
          <DisplayItemContent>test</DisplayItemContent>
        }

      </NewInBuzzSliderWrapper>
    </>
  )
}

NewCollectionSectionSlider.propTypes = {
  buzzArticles: PropTypes.array,
}

export default NewCollectionSectionSlider
