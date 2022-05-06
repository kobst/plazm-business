
import React from 'react'
import styled from 'styled-components'


const TooltipInner = styled.div`
max-width: 169px;
background: rgba(0, 0, 0, 0.82);
padding:15px;
min-width: 100px;
border-radius:12px;
position: absolute !important;
top: 31px;
right: -17px;
z-index: 9;
color:#fff;
visibility:visible;
display:block !important;
:after{
  bottom: 100%;
  right: 37px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
:after{
  border-color: rgba(136, 183, 213, 0);
  border-bottom-color: rgba(0, 0, 0, 0.82);
  border-width: 6px;
  right: 22px;
}
ul{
    list-style:none;
    li{
        font-size: 11px ;
        line-height:16px ;
        color:#fff ;
    }
}
strong{
  font-size: 9px ;
  line-height:15px ;
  color:#fff ;
  font-weight:700;
}

`

const Tooltip = (props) => {
    return(

    <TooltipInner {...props} /> 
    )
}

export default Tooltip