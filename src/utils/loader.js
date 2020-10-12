import React from 'react'
import Loader from 'react-loader-spinner'

const ValueLoader = ({height=25,width=35}) => {
 
     return(
        <Loader type="Oval" color="#00BFFF" height={height} width={width} />
     );
  
 }

 export default ValueLoader