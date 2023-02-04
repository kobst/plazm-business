import React from "react";
import styled from "styled-components";
import CommentStaticImg from "../../../../../../../images/CommentStaticImg.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 536px;
  max-height: 224px;
  margin: 0;
  @media (max-width: 767px) {
    margin: 0 auto;
  }
  img {
    max-height: 224px;
    /* width: 100%;
    height: 100%; */
  }
`;

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

const ImageComment = ({ image, imgSources }) => {
  return (
    <>
      {image !== '' ? (
        <BottomBarLikes>
          <img src={image !== '' ? image : CommentStaticImg} alt="" />
        </BottomBarLikes>
      ) : null}
      {imgSources && imgSources.length ? (
        <ImageSliderWrap>
          <Slider dots={true} autoplay={true}>
            {imgSources.map((src) => (
              <div key={src} className="ImgWrapper">
                <img src={src} />
              </div>
            ))}
          </Slider>
        </ImageSliderWrap>
      ) : null}
    </>
  );
};

export default ImageComment;
