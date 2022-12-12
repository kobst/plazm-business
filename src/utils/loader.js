import React from 'react';
import loaderSrc from '../images/plazm_loader.gif';

const ValueLoader = ({height = 28, width = 80}) => {
  return <img src={loaderSrc} alt="loading..." height={height} width={width} />;
};

export default ValueLoader;
