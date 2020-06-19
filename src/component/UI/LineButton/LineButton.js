
import React from 'react'
import styled from 'styled-components'
import DownArrow from '../../../Public/images/down-arrow.svg'

const ButtonText = styled.div`
height: 37px;
border:1px solid #A8A8A8;
border-radius: 5px;
font-size: 12px;
color: #848484;
font-family: 'Roboto',sans-serif;
display: inline-flex;
align-items: center;
justify-content: center;
padding: 0 10px;
cursor:pointer;
img{
  margin-left:6px;
}
`

const LineButton = props => {
    return(
      <ButtonText>{props.name}<img src={DownArrow} alt={DownArrow} /></ButtonText>
    )
}

export default LineButton