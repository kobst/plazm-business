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
    color: #6c6c6c;
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: #ff2e9a;
  }
  .ImgWrapper {
    img {
      max-height: 300px;
      margin: 0 auto;
    }
  }
`;

const ImageSlider = ({ imgSources }) => {
  return (
    <ImageSliderWrap>
      <Slider dots={true} autoplay={true}>
        {imgSources.map((src) => (
          <div key={src} className="ImgWrapper">
            <img src={src} />
          </div>
        ))}
      </Slider>
    </ImageSliderWrap>
  );
};

export default ImageSlider;
