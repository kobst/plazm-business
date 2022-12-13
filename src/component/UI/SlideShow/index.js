import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// eslint-disable-next-line react/display-name
const SlideShow = React.memo(({image})=> {
  const [slideImage, setSlideImage]= useState();

  useEffect(() => {
    if (image) {
      setSlideImage(image);
    }
  }, [image]);

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    900: {
      items: 1,
    },
    1200: {
      items: 1,
    },

  };


  return (
    <AliceCarousel infinite={false} responsive={responsive} >
      {slideImage? slideImage.map((v, key)=>
        <img key={key} src={v.image} className="" alt=""/>,
      ):null}
    </AliceCarousel>
  );
});


export default SlideShow;
