import React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const SlideShow = ({image,currentIndex})=> {
  const  responsive = {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      900: {
        items: 1
      },
      1200: {
        items: 1
      }
       
    }

    


    return (
       <AliceCarousel infinite={false} slideToIndex={currentIndex} responsive={responsive} >
           {image ? image.map(v=> 
          <img src={v} className="" alt=""/>
        ):null}
      </AliceCarousel>
    );
  }


  export default SlideShow