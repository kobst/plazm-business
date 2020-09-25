import React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const SlideShow = ({image,currentIndex})=> {
  const  responsive = {
        0: { items: 1 },
        2000: { items: 2 },
      }


    return (
       <AliceCarousel slideToIndex={currentIndex} responsive={responsive} autoPlay autoPlayInterval="2000">
           {image ? image.map(v=> 
        <img src={v} className="sliderimg" alt=""/>
        ):null}
      </AliceCarousel>
    );
  }


  export default SlideShow