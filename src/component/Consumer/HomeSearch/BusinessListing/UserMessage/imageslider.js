import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSliderWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 15px 0;
  .slick-arrow {
    display: none !important;
  }
  .slick-dots {
    bottom: 10px;
  }
  .slick-dots li {
    margin: 0 -4px;
  }
  .slick-dots li button:before {
    opacity: 1;
    color: #6C6C6C;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #FF2E9A;
  }
  .ImgWrapper {
    img {
      width: 100%;
      max-height: 260px;
    }
  }
`;

const ImageSlider = ({  }) => {      
      return (
        <ImageSliderWrap>
          <Slider 
            dots = {true}
            autoplay = {true}
          >
            <div className="ImgWrapper">
              <img src="https://picsum.photos/200/300" />
            </div>
            <div className="ImgWrapper">
              <img src="https://picsum.photos/id/237/200/300" />
            </div>
            <div className="ImgWrapper">
              <img src="https://picsum.photos/seed/picsum/200/300" />
            </div>
            
            
          </Slider>
        </ImageSliderWrap>
      );  
};

export default ImageSlider;
